from typing import Dict, List, Optional
from threading import Lock
from app.models import Todo


class TodoDatabase:
    def __init__(self):
        self._by_id: Dict[int, Todo] = {}
        self.lock = Lock() 
        self.new_id: int = 1
        self.create("Walk the dog")
        self.create("Feed the cat", completed=True)

    def _initialize_new_id(self) -> int:
        with self.lock:
            new_id = self.new_id
            self.new_id += 1 
            return new_id
    
    # Get all todos
    def get_all_todos(self) -> List[Todo]:
        with self.lock:
            return list(self._by_id.values())

    # Get a todo by ID 
    def get_todo_by_id(self, todo_id: int) -> Optional[Todo]:
        with self.lock:
            return self._by_id.get(todo_id)

    # Create a new todo
    def create(self, title: str, completed: bool = False) -> Todo:
        tid = self._initialize_new_id()
        todo = Todo(id=tid, title=title, completed=completed)
        with self.lock: 
            self._by_id[tid] = todo
        return todo

    # Update a todo
    def update(self, todo_id: int, title: Optional[str] = None, completed: Optional[bool] = None) -> Optional[Todo]:
        with self.lock:
            todo = self._by_id.get(todo_id)
            if not todo:
                return None
            data = todo.model_copy(
                update = {
                    "title": title if title is not None else todo.title,
                    "completed": completed if completed is not None else todo.completed,
                })
            self._by_id[todo_id] = data
            return data

    # Delete a todo
    def delete(self, todo_id: int) -> bool:
        with self.lock:
            return self._by_id.pop(todo_id, None) is not None

db = TodoDatabase()

