from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException, RequestValidationError
from fastapi.requests import Request
from app.routers import todos

# Create FastAPI instance
app = FastAPI(
    title="Todo API",
    description="A simple todo management API built with FastAPI",
    version="1.0.0",
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todos.router)

# Validation error & Invalid JSON format error handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    error_list = exc.errors()
    
    for error in error_list:
        error_type = error.get("type", "")
        if error_type == "value_error" or (
            error_type.startswith("value_error.") and 
            error_type != "value_error.jsondecode"
        ):
            field_name = error["loc"][-1] if error.get("loc") else "request"
            error_message = error["msg"]
            message = f"{field_name}: {error_message}"
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"detail": message}
            )
    
    error = error_list[0]
    field_name = error["loc"][-1] if error.get("loc") else "request"
    error_message = error["msg"]
    message = f"{field_name}: {error_message}"
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": message}
    )

# Basic error handling
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code, 
        content={"detail": exc.detail}
    )

@app.get("/", tags = ["root"])
async def root():
    return {"message": "Todo API is running!"}
