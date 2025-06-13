// backend/index.js
require('dotenv').config();

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');

// Importa suas rotas
const userRoutes        = require('./routes/user');
const messageRoutes     = require('./routes/messages');
const preferencesRoutes = require('./routes/preferences');

// (Opcional) rota raiz simples
const appRouter         = require('./routes/app');

const app = express();

// Conecta ao MongoDB (ajuste a URI conforme seu .env)
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/mean_app',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas principais
app.use('/', appRouter);
app.use('/user', userRoutes);
app.use('/messages', messageRoutes);
app.use('/preferences', preferencesRoutes);

// Se você tiver views/ com HBS, configure aqui:
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
