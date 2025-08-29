import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import select
from database import Base, engine, SessionLocal
from models import Product, AuditLog
from audit import write_audit, to_dict_product

app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("PORT", "8000"))

# cria tabelas se não existirem
with engine.begin() as conn:
    Base.metadata.create_all(bind=conn)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/products")
def list_products():
    with SessionLocal() as db:
        products = db.scalars(select(Product).order_by(Product.id)).all()
        resp = [to_dict_product(p) for p in products]
        write_audit("READ", "products", None, None, None, 200, resp)
        return jsonify(resp), 200

@app.post("/products")
def create_product():
    data = request.get_json(force=True)
    nome = (data.get("nome") or "").strip()
    preco = data.get("preco")

    if not nome:
        return jsonify({"error": "nome é obrigatório"}), 400
    try:
        preco = float(preco)
    except (TypeError, ValueError):
        return jsonify({"error": "preco inválido"}), 400

    with SessionLocal() as db:
        p = Product(nome=nome, preco=preco)
        db.add(p)
        db.commit()
        db.refresh(p)

        resp = to_dict_product(p)
        write_audit("CREATE", "products", p.id, None, resp, 201, resp)
        return jsonify(resp), 201

@app.put("/products/<int:pid>")
def update_product(pid: int):
    data = request.get_json(force=True)
    with SessionLocal() as db:
        p = db.get(Product, pid)
        if not p:
            return jsonify({"error": "produto não encontrado"}), 404
        old = to_dict_product(p)

        p.nome = data.get("nome", p.nome)
        p.preco = data.get("preco", p.preco)
        db.add(p)
        db.commit()
        db.refresh(p)

        resp = to_dict_product(p)
        write_audit("UPDATE", "products", p.id, old, resp, 200, resp)
        return jsonify(resp), 200

@app.delete("/products/<int:pid>")
def delete_product(pid: int):
    with SessionLocal() as db:
        p = db.get(Product, pid)
        if not p:
            return jsonify({"error": "produto não encontrado"}), 404
        old = to_dict_product(p)
        db.delete(p)
        db.commit()

        resp = {"ok": True}
        write_audit("DELETE", "products", pid, old, None, 200, resp)
        return jsonify(resp), 200

@app.get("/audit-logs")
def get_audit_logs():
    with SessionLocal() as db:
        logs = db.query(AuditLog).order_by(AuditLog.id.desc()).limit(200).all()
        out = []
        for l in logs:
            out.append({
                "id": l.id,
                "action": l.action,
                "table_name": l.table_name,
                "record_id": l.record_id,
                "old_data": l.old_data,
                "new_data": l.new_data,
                "http_method": l.http_method,
                "route": l.route,
                "username": l.username,
                "status_code": l.status_code,
                "response": l.response,
                "timestamp": l.timestamp.isoformat() if l.timestamp else None
            })
        return jsonify(out), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
