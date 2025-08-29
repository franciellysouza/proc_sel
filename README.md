# proc_sel
# Cadastro de Produtos

Este é um projeto full-stack para **gerenciamento de produtos**, utilizando **PostgreSQL** como banco de dados, **Python** no backend e **React** no frontend. O projeto roda facilmente com **Docker Compose**.

---

## Funcionalidade

- Tela de **Produtos**: permite cadastrar, visualizar, editar e remover produtos.
- Tela de **Auditoria**: mostra as últimas requisições feitas pelo usuário à API, permitindo acompanhar alterações e acessos.
- Backend em Python com APIs REST para manipulação de produtos e logs de auditoria.
- Frontend em React para interface de usuário moderna e responsiva.

---

## Dependências

- Docker
- Docker Compose

Não é necessário instalar diretamente Python, Node ou PostgreSQL no computador, pois tudo roda dentro de containers.

---

## Como Executar

Na raiz do projeto, rode:

```bash
docker-compose up --build -d
```

## Como Parar

Na raiz do projeto, rode:

```bash
docker-compose down -v
```

## URLs

Backend: http://localhost:8000

Frontend: http://localhost:5173

## Estrutura do Projeto
.
├── backend/       # Código Python do backend
├── frontend/      # Código React do frontend
├── docker-compose.yml
└── README.md

## Observações

O banco de dados é configurado automaticamente pelo Docker Compose.

Todas as ações realizadas pelo usuário na tela de produtos são registradas na tela de auditoria.
