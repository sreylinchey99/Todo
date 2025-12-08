from fastapi import APIRouter, HTTPException, status
from fastapi.responses import Response
from typing import List
from app.models import Todo, TodoCreate, TodoUpdate
from app.database import db


router = APIRouter(prefix="/todos", tags=["todos"])

# Get all todos
@router.get("/", response_model=List[Todo], status_code=status.HTTP_200_OK)
async def list_todos():
    return db.get_all_todos()

# Get a todo by ID
@router.get("/{todo_id}", response_model=Todo, status_code=status.HTTP_200_OK)
async def get_todo(todo_id: int):
    todo = db.get_todo_by_id(todo_id)
    if not todo:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Todo not found")
    return todo

# Create a new todo 
@router.post("/", response_model=Todo, status_code=status.HTTP_201_CREATED)
async def create_todo(todo: TodoCreate):
    return db.create(title=todo.title, completed=False)

# Update a todo
@router.put("/{todo_id}", response_model=Todo, status_code=status.HTTP_200_OK)
async def update_todo(todo_id: int, todo: TodoUpdate):
    updated = db.update(todo_id = todo_id, title = todo.title, completed = todo.completed)
    if not updated:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Todo not found")
    return updated

# delete a todo
@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: int):
    deleted = db.delete(todo_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

