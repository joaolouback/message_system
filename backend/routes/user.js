// backend/routes/user.js

/* Carrega variáveis de ambiente e dependências */
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const User = require('../Models/user');

const router = express.Router();

/* Configuração do Multer para uploads de avatar */
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

/*
  POST /user/signup
  - Recebe dados e arquivo de avatar
  - Valida email único
  - Cria usuário com avatarUrl (se fornecido)
  - Gera JWT com 1 dia de expiração
  - Retorna token e dados do usuário
*/
router.post('/signup', upload.single('avatar'), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    const avatarUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const user = new User({ username, email, password, avatarUrl });
    const saved = await user.save();
    const token = jwt.sign(
      { id: saved._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: saved._id,
        username: saved.username,
        email: saved.email,
        avatarUrl: saved.avatarUrl
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário', details: err.message });
  }
});

/*
  POST /user/signin
  - Recebe email e senha
  - Valida credenciais
  - Gera JWT com 1 dia de expiração
  - Retorna token e dados do usuário
*/
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({
      message: 'Autenticado com sucesso',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao autenticar usuário', details: err.message });
  }
});

/*
  PUT /user/:id/avatar
  - Recebe arquivo de novo avatar
  - Atualiza avatarUrl do usuário
*/
router.put('/:id/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    user.avatarUrl = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({
      message: 'Avatar atualizado com sucesso',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar avatar', details: err.message });
  }
});

/*
  GET /user/:id
  - Retorna dados do usuário sem a senha
*/
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuário', details: err.message });
  }
});

/* Exporta o router para montagem no app.js */
module.exports = router;