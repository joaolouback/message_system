// backend/app.js

/* Carrega variáveis de ambiente do arquivo .env (ex: JWT_SECRET) */
require('dotenv').config();

/* Importa dependências principais */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

/* Importa módulos de rota */
const messageRoutes = require('./routes/messages.js');
const appRoutes = require('./routes/app');
const userRoutes = require('./routes/user');

/* Cria instância do Express */
const app = express();

/* Conecta ao MongoDB usando Mongoose */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MyMongoDB')
  .then(() => console.log('MongoDB conectado.'))
  .catch(err => console.error('Erro na conexão:', err));

/* Configura o motor de visualização (Handlebars) */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* Middlewares */
// Parser de JSON e de dados URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Servir arquivos estáticos e uploads de imagens
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Configuração de CORS e cabeçalhos permitidos
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

/* Monta as rotas da aplicação */
app.use('/messages', messageRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

/* Rota catch-all para renderizar a view principal */
app.use((req, res) => res.render('index'));

/* Exporta o app configurado */
module.exports = app;