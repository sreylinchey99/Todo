"use client";
import { useState, useEffect } from 'react';
import CheckBox from './checkBox';
import Button from './button';
import type { Todo } from '../lib/api';

interface TodoListCardProps {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onEdit: (todo: Todo, newTitle: string) => void;
    onDelete: (id: number) => void;
}

export default function TodoListCard({ todo, onToggle, onEdit, onDelete }: TodoListCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    useEffect(() => {
        if (!isEditing) {
            setEditTitle(todo.title);
        }
    }, [todo.title, isEditing]);

    const handleSaveEdit = () => {
        if (editTitle.trim() && editTitle !== todo.title) {
            onEdit(todo, editTitle.trim());
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditTitle(todo.title);
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    return (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 w-full flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row items-center gap-4 flex-1 min-w-0">
                <CheckBox 
                    todo={todo} 
                    onChange={() => onToggle(todo)} 
                />
                {isEditing ? (
                    <input 
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1 p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
                        autoFocus
                    />
                ) : (
                    <p className={`flex-1 text-sm sm:text-base break-words ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.title}
                    </p>
                )}
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-4 flex-shrink-0">
                {isEditing ? (
                    <>
                        <Button 
                            label="Save" 
                            onClick={(e) => {
                                e.preventDefault();
                                handleSaveEdit();
                            }} 
                            textColor="text-white" 
                            backgroundColor="bg-green-500" 
                            borderColor="border-green-500" 
                            onhoverBackgroundColor="bg-green-600" 
                        />
                        <Button 
                            label="Cancel" 
                            onClick={(e) => {
                                e.preventDefault();
                                handleCancelEdit();
                            }} 
                            textColor="text-white" 
                            backgroundColor="bg-gray-500" 
                            borderColor="border-gray-500" 
                            onhoverBackgroundColor="bg-gray-600" 
                        />
                    </>
                ) : (
                    <>
                        <Button 
                            label="Edit" 
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEditing(true);
                            }} 
                            textColor="text-white" 
                            backgroundColor="bg-gray-500" 
                            borderColor="border-gray-500" 
                            onhoverBackgroundColor="bg-gray-600" 
                        />
                        <Button 
                            label="Delete" 
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete(todo.id);
                            }} 
                            textColor="text-white" 
                            backgroundColor="bg-red-500" 
                            borderColor="border-red-500" 
                            onhoverBackgroundColor="bg-red-600" 
                        />
                    </>
                )}
            </div>
        </div>
    );
}