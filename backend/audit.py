from typing import Optional, Dict, Any
from models import AuditLog
from database import SessionLocal
from flask import request

def to_dict_product(p) -> Dict[str, Any]:
    if p is None:
        return {}
    return {"id": p.id, "nome": p.nome, "preco": float(p.preco) if p.preco is not None else None}

def write_audit(action: str, table_name: str, record_id: Optional[int],
                old_data: Optional[dict], new_data: Optional[dict],
                status_code: int, response_json: dict):
    db = SessionLocal()
    try:
        log = AuditLog(
            action=action,
            table_name=table_name,
            record_id=record_id,
            old_data=old_data,
            new_data=new_data,
            http_method=request.method,
            route=request.path,
            username=request.headers.get("X-User"),
            status_code=status_code,
            response=response_json
        )
        db.add(log)
        db.commit()
    finally:
        db.close()
