from sqlalchemy import Column, Integer, String, Numeric, DateTime, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from database import Base

class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(String(200), nullable=False)
    preco: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("NOW()"))

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    action: Mapped[str] = mapped_column(String(20), nullable=False)
    table_name: Mapped[str] = mapped_column(String(100), nullable=False)
    record_id: Mapped[int] = mapped_column(Integer, nullable=True)
    old_data = Column(JSONB)
    new_data = Column(JSONB)

    http_method: Mapped[str] = mapped_column(String(10), nullable=True)
    route: Mapped[str] = mapped_column(String(200), nullable=True)
    username: Mapped[str] = mapped_column(String(100), nullable=True)
    status_code: Mapped[int] = mapped_column(Integer, nullable=True)
    response = Column(JSONB)

    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("NOW()"))
