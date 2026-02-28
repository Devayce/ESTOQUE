# Sistema de Gerenciamento de Estoque

Este projeto é uma aplicação completa para gerenciamento de estoque, vendas e produtos, desenvolvida com React no frontend e Express no backend.

## 🚀 Tecnologias

- **Frontend:** React, TypeScript, Vite, React Router
- **Backend:** Node.js, Express, TypeScript
- **Testes:** Vitest

## 📂 Estrutura de Pastas

O projeto está organizado em dois diretórios principais:

- `/ESTOQUE`: Contém o código fonte do Frontend (React/Vite).
- `/backend`: Contém o código fonte da API (Express).

## 🛠️ Instalação e Execução

Para rodar o projeto localmente, você precisará de dois terminais abertos (um para o backend e outro para o frontend). Certifique-se de ter o Node.js instalado.

### 1. Backend

Acesse a pasta do backend, instale as dependências e inicie o servidor:

```bash
cd backend
npm install
npm run dev
```
*O servidor iniciará por padrão em `http://localhost:5000`.*

### 2. Frontend

Acesse a pasta do frontend, instale as dependências e inicie a aplicação:

```bash
cd ESTOQUE
npm install
npm run dev
```
*A aplicação estará disponível geralmente em `http://localhost:5173`.*

> **Nota:** O frontend está configurado (`vite.config.ts`) para redirecionar automaticamente as requisições `/api` para o backend na porta 5000.

## 📡 Endpoints da API

A API fornece as seguintes rotas principais (prefixo `/api`):

- **Produtos** (`/products`): Listagem, adição, atualização (PATCH) e remoção de produtos.
- **Pedidos** (`/orders`): Criação e listagem de pedidos de venda.
- **Estoque** (`/stock-movements`): Visualização das movimentações de estoque.
- **Lucro** (`/profit`): Relatórios de lucratividade.

## 🧪 Testes

O projeto frontend possui testes configurados com Vitest. Para executá-los:

```bash
cd ESTOQUE
npm run test
```
