from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GreetRequest(BaseModel):
    name: str
    age: int
    city: str = "unknown"

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/hello")
def hello(name: str = "stranger"):
    return {"message": f"Hello, {name}!"}

@app.post("/greet")
def greet_post(req: GreetRequest):
    return {"message": f"Hey {req.name}, age {req.age}, from {req.city}, next year age {req.age + 1}, welcome to OpenQ!"}