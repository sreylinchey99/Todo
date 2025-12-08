# Todo Backend API

A RESTful API for managing todo items built with FastAPI. This backend provides CRUD operations for a todo management application.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete) for todos
- ✅ Input validation with Pydantic models
- ✅ Proper HTTP status codes and error handling
- ✅ CORS enabled for frontend integration
- ✅ Thread-safe in-memory database

## Tech Stack

- **FastAPI** - Framework for building APIs
- **Pydantic** - Data validation
- **Python 3.12+** - Programming language

## Prerequisites

- Python 3.12 or higher
- `uv` package manager (recommended) or `pip`

## Installation

### Using uv (Recommended)

1. Install dependencies:
```bash
uv sync
```

2. Activate the virtual environment:
```bash
# On Windows
.venv\Scripts\activate

# On macOS/Linux
source .venv/bin/activate
```

### Using pip

1. Create a virtual environment:
```bash
python -m venv .venv
```

2. Activate the virtual environment:
```bash
# On Windows
.venv\Scripts\activate

# On macOS/Linux
source .venv/bin/activate
```

3. Install dependencies:
```bash
pip install "fastapi[standard]>=0.115.12"
```

## Running the Server

### Using uv

```bash
uv run uvicorn app.main:app --reload
```

### Using uvicorn directly

```bash
uvicorn app.main:app --reload
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive API Docs (Swagger UI)**: http://localhost:8000/docs

## API Endpoints

### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. Get All Todos
- **GET** `/todos/`
- **Description**: Retrieve all todo items
- **Response**: Array of todo objects
- **Status Code**: `200 OK`

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Walk the dog",
    "completed": false
  },
  {
    "id": 2,
    "title": "Feed the cat",
    "completed": true
  }
]
```

#### 2. Get Todo by ID
- **GET** `/todos/{todo_id}`
- **Description**: Retrieve a specific todo by ID
- **Parameters**: `todo_id` (integer, path parameter)
- **Response**: Todo object
- **Status Codes**: 
  - `200 OK` - Todo found
  - `404 Not Found` - Todo not found

**Example Response:**
```json
{
  "id": 1,
  "title": "Walk the dog",
  "completed": false
}
```

#### 3. Create Todo
- **POST** `/todos/`
- **Description**: Create a new todo item
- **Request Body**:
```json
{
  "title": "New task"
}
```
- **Response**: Created todo object
- **Status Codes**: 
  - `201 Created` - Todo created successfully
  - `400 Bad Request` - Validation error (e.g., empty title)
  - `422 Unprocessable Entity` - Invalid request data

**Example Response:**
```json
{
  "id": 3,
  "title": "New task",
  "completed": false
}
```

#### 4. Update Todo
- **PUT** `/todos/{todo_id}`
- **Description**: Update an existing todo item
- **Parameters**: `todo_id` (integer, path parameter)
- **Request Body** (all fields optional):
```json
{
  "title": "Updated task",
  "completed": true
}
```
- **Response**: Updated todo object
- **Status Codes**: 
  - `200 OK` - Todo updated successfully
  - `404 Not Found` - Todo not found

**Example Response:**
```json
{
  "id": 1,
  "title": "Updated task",
  "completed": true
}
```

#### 5. Delete Todo
- **DELETE** `/todos/{todo_id}`
- **Description**: Delete a todo item
- **Parameters**: `todo_id` (integer, path parameter)
- **Response**: No content
- **Status Codes**: 
  - `204 No Content` - Todo deleted successfully
  - `404 Not Found` - Todo not found

## Error Handling

The API implements proper HTTP status codes for different error scenarios:

### Status Codes

- **400 Bad Request**: Validation errors  
- **404 Not Found**: Resource not found  
- **422 Unprocessable Entity**: Invalid request data  

### Error Response Format Example

**400 Bad Request** (Validation Error):
```json
{
  "detail": "title: Title cannot be empty"
}
```

**404 Not Found**:
```json
{
  "detail": "Todo not found"
}
```

**422 Unprocessable Entity** (Invalid Data Type):
```json
{
  "detail": "title: Input should be a valid string"
}
```

## Data Models

```python
{
  "id": int,           # Auto-generated unique id
  "title": str,        # Todo title (required, cannot be empty)
  "completed": bool    # Completion status 
}
```

## Project Structure

```
be-coding-assessment/
└── backend/
    └── app/
        ├── __init__.py
        ├── main.py            # FastAPI application and error handlers
        ├── models.py          # Pydantic models for request/response
        ├── database.py        # In-memory database implementation
        └── routers/
            ├── __init__.py
            └── todos.py       # Todo endpoints
```

## CORS Configuration

The API is configured to allow requests from:
- `http://localhost:3000` (Next.js frontend)


## Development

```bash
uvicorn app.main:app --reload
```

You can test the API using:

1. **Swagger UI**: http://localhost:8000/docs


### CORS Issues
Make sure the frontend URL in CORS configuration matches your frontend's URL.


