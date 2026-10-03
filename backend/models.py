from sqlalchemy import Column, Integer, String, DateTime, func
from database import Base

class Queue(Base):
    __tablename__ = "queues"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    avg_service_minutes = Column(Integer, default=15, nullable=False)
    status = Column(String, default="open", nullable=False)
    public_slug = Column(String, unique=True, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    