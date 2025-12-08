"use client";

import type { Todo } from '../lib/api';

interface CheckBoxProps {
    todo: Todo;
    onChange: () => void;
}
export default function CheckBox({ todo, onChange }: CheckBoxProps) {

    return (
        <input 
            id={`checkbox-${todo.id}`}
            type="checkbox" 
            className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer" 
            checked={todo.completed} 
            onChange={onChange} 
        />
    );
}