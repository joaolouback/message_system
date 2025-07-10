# 📬 Message System - Aplicação Full Stack de Mensagens

Este projeto foi desenvolvido como parte prática da disciplina **Desenvolvimento Avançado para Web**, no curso de Ciência da Computação. A proposta consiste na construção de uma aplicação full stack utilizando a stack **MEAN** (MongoDB, Express.js, Angular e Node.js), com autenticação segura via JWT.

## 🎯 Funcionalidades

- ✅ Cadastro de mensagens  
- ✅ Visualização de mensagens cadastradas  
- ✅ Edição, exclusão e reação de mensagens  
- ✅ Autenticação de usuários via JWT  
- ✅ Integração com MongoDB para persistência dos dados  
- ✅ Backend estruturado em Node.js com Express  


## 🧱 Tecnologias Utilizadas

### Frontend

- TypeScript
- Vite
- JavaScript moderno (ES6+)
- HTML5 e CSS3
- Angular

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Dotenv

### Outros

- Versionamento com Git
- Projeto hospedado no GitHub
- MongoDB local (ou compatível com Atlas)

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- MongoDB rodando localmente ou online (ex: MongoDB Atlas)
- Vue CLI (ou Vite) instalado globalmente

### Clonando o Repositório

```bash
git clone https://github.com/joaolouback/message_system
```

### Executando o Backend

```bash
cd backend
npm install
npm run dev
```

### Executando o Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Autenticação JWT

A aplicação conta com um sistema de autenticação seguro baseado em JSON Web Token (JWT). O login retorna um token que é utilizado nas requisições protegidas, garantindo segurança e controle de acesso a rotas privadas.

## 💬 Reações às Mensagens

Além das funcionalidades básicas de mensagens, os usuários podem interagir com mensagens utilizando reações (como curtir ou amar). Essa funcionalidade enriquece a comunicação e oferece uma experiência mais dinâmica e interativa para os usuários.

