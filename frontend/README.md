# Todo Frontend Application

A responsive Todo List application built with Next.js and Tailwind CSS. This frontend provides a complete user interface for managing todo items with full CRUD functionality.

## Features

- ✅ **Create Todos** - Add new tasks with a simple input field
- ✅ **Read Todos** - Display all todos in a clean, organized list
- ✅ **Update Todos** - Edit task titles and toggle completion status
- ✅ **Delete Todos** - Remove tasks with a single click
- ✅ **Loading States** - Visual feedback during data fetching


## Prerequisites

- **Node.js** v20 or later
- **npm** or **yarn** package manager
- Backend API running on `http://localhost:8000` (see [Backend README](../backend/README.md))

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Environment Setup

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

## Running the Server

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── component/
│       │   ├── button.tsx          # Reusable button component
│       │   ├── checkBox.tsx        # Checkbox component for todo completion
│       │   └── TodoListCard.tsx    # Todo List cards
│       ├── lib/
│       │   └── api.ts              # API client functions
│       ├── globals.css             # Global styles and Tailwind imports
│       ├── layout.tsx              # Root layout component
│       └── page.tsx                # Main todo list page
```
