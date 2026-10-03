from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from models import Queue
import secrets

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class QueueCreateSchema(BaseModel):
    name: str
    avg_service_minutes: int = 15

class QueueOut(BaseModel):
    id: int
    name: str
    avg_service_minutes: int
    status: str
    public_slug: str

    class Config:
        from_attributes = True

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/queues", response_model=QueueOut)
def createQueue(payload: QueueCreateSchema, db: Session = Depends(get_db)):
    slug = secrets.token_urlsafe(6)
    queue = Queue(
        name=payload.name,
        avg_service_minutes=payload.avg_service_minutes,
        public_slug=slug
    )
    db.add(queue)
    db.commit()
    db.refresh(queue)
    return queue

@app.get("/queues", response_model=list[QueueOut])
def list_queues(db: Session = Depends(get_db)):
    return db.query(Queue).order_by(Queue.created_at.desc()).all()