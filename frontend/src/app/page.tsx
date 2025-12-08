"use client";
import TodoListCard from "./component/TodoListCard";
import Button from "@/app/component/button";
import { getTodos, Todo, createTodo, updateTodo, deleteTodo } from "./lib/api";
import { useState, useEffect } from "react";

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    refresh();
  }, []);

  async function refresh(){
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTodo(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    
    const temp: Todo = {id: Date.now(), title: title, completed: false};
    setTodos((prev) => [temp, ...prev]);
    setNewTitle("");

    try {
      const created = await createTodo(title);
      setTodos((prev) => [created, ...prev.filter(t => t.id !== temp.id)]);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Failed to create");
      setTodos((prev) => prev.filter(t => t.id !== temp.id));
    }
  }

  async function handleCheckBoxTodo(todo: Todo) {
    try {
      const updated = await updateTodo({
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      });
      setTodos((prev) => prev.map(t => t.id === todo.id ? updated : t));
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Failed to update");
    }
  }

  async function handleEditTodo(todo: Todo, newTitle: string) {
    if (!newTitle.trim()) return;
    
    try {
      const updated = await updateTodo({
        id: todo.id,
        title: newTitle.trim(),
        completed: todo.completed
      });
      setTodos((prev) => prev.map(t => t.id === todo.id ? updated : t));
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Failed to update");
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter(t => t.id !== id));
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Failed to delete");
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 gap-4 sm:gap-6 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">To Do List</h2>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 w-full max-w-2xl">
        <input 
          type="text" 
          placeholder="Add new task" 
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo(e as any);
            }
          }}
        />
        <Button 
          label="Add" 
          onClick={handleAddTodo}
          textColor="text-white" 
          backgroundColor="bg-blue-500" 
          borderColor="border-blue-500" 
          onhoverBackgroundColor="bg-blue-600" 
        />
      </div>

      {error && (
        <div className="w-full max-w-2xl p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm sm:text-base">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-gray-500 text-sm sm:text-base">Loading...</div>
      )}

      {!loading && (
        <div className="w-full max-w-2xl flex flex-col gap-3 sm:gap-4">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 p-6 sm:p-8 text-sm sm:text-base">
              Add your first todo task above.
            </div>
          ) : (
            todos.map((todo) => (
              <TodoListCard 
                key={todo.id} 
                todo={todo} 
                onToggle={handleCheckBoxTodo}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo} 
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
