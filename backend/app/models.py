from pydantic import BaseModel, field_validator
from typing import Optional


class Todo(BaseModel):
    id: int
    title: str
    completed: bool = False

class TodoCreate(BaseModel):
    title: str

    @field_validator('title')
    @classmethod
    def validate_title(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError('Title cannot be empty')
        return v

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

    @field_validator('title')
    @classmethod
    def validate_title(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        v = v.strip()
        if not v:
            raise ValueError('Title cannot be empty')
        return v

