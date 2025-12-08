'use server';

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
if (!BASE_URL) {
    throw new Error('BASE_URL not found');
}

export async function getTodos(): Promise<Todo[]> {
    try {
        const response = await fetch(`${BASE_URL}/todos`);
        if (!response.ok){
            throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error("Cannot connect to server");
        }
        throw error;
    }
}


export async function createTodo(title: string): Promise<Todo> {
  try {
    const r = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!r.ok) throw new Error("Failed to create todo");
    return r.json();
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Cannot connect to server");
    }
    throw error;
  }
}

export async function updateTodo(todo: Partial<Todo> & { id: number }): Promise<Todo> {
  try {
    const r = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: todo.title, completed: todo.completed }),
    });
    if (!r.ok) {
      if (r.status === 404) throw new Error("Todo not found");
      throw new Error("Failed to update todo");
    }
    return r.json();
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Cannot connect to server");
    }
    throw error;
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const r = await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
    if (!r.ok) {
      if (r.status === 404) throw new Error("Todo not found");
      throw new Error("Failed to delete todo");
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Cannot connect to server");
    }
    throw error;
  }
}