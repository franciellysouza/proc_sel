-- create_tables.sql

DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS products;

-- Tabela de produtos
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  preco NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de auditoria
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  action VARCHAR(20) NOT NULL,          -- CREATE / READ / UPDATE / DELETE
  table_name VARCHAR(100) NOT NULL,
  record_id INTEGER,

  -- dados de antes/depois
  old_data JSONB,
  new_data JSONB,

  -- info da requisição e resposta
  http_method VARCHAR(10),
  route VARCHAR(200),
  username VARCHAR(100),
  status_code INT,
  response JSONB,

  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices úteis
CREATE INDEX idx_audit_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_products_nome ON products(nome);
