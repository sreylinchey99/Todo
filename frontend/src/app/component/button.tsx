"use client";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    textColor: string;
    backgroundColor: string;
    borderColor: string;
    onhoverBackgroundColor: string;
}

const hoverColorMap: Record<string, string> = {
    'bg-blue-500': 'hover:bg-blue-600',
    'bg-blue-600': 'hover:bg-blue-700',
    'bg-green-500': 'hover:bg-green-600',
    'bg-green-600': 'hover:bg-green-700',
    'bg-gray-500': 'hover:bg-gray-600',
    'bg-gray-600': 'hover:bg-gray-700',
    'bg-red-500': 'hover:bg-red-600',
    'bg-red-600': 'hover:bg-red-700',
};

export default function Button({ label, onClick, textColor, backgroundColor, borderColor, onhoverBackgroundColor }: ButtonProps) {
    const hoverClass = hoverColorMap[onhoverBackgroundColor] || hoverColorMap[backgroundColor] || '';
    
    return (
        <button 
            className={`px-4 py-2 rounded-md border ${backgroundColor} ${textColor} ${borderColor} ${hoverClass} transition-colors`} 
            onClick={onClick}
        >
            {label}
        </button>
    );
}