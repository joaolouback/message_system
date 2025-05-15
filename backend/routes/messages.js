const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../Models/message');

// rota de listar mensagens, criar, editar, deletar...
router.get('/', async (req, res) => {
  const messages = await Message.find().populate('author', 'username avatarUrl');
  res.json({ messages });
});

// rota de reações com emoji
router.post('/:id/react', auth, async (req, res) => {
  const { emoji } = req.body;
  if (!emoji) return res.status(400).json({ error: 'Emoji é obrigatório' });

  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Mensagem não encontrada' });

    const count = msg.reactions.get(emoji) || 0;
    msg.reactions.set(emoji, count + 1);

    await msg.save();
    res.status(200).json({ reactions: msg.reactions });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao reagir', details: err });
  }
});

module.exports = router; // ✅ ESSENCIAL!
