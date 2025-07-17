const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../Models/message');


router.get('/', async (req, res) => {
  const messages = await Message.find().populate('author', 'username avatarUrl');
  res.json({ messages });
});


const mongoose = require('mongoose');

router.post('/:id/react', auth, async (req, res) => {
  const { emoji } = req.body;
  const userId = req.userData.userId;

  if (!emoji) {
    return res.status(400).json({ error: 'Emoji é obrigatório' });
  }

  if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'ID de mensagem inválido' });
  }

  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Mensagem não encontrada' });

   
    msg.reactions.forEach((value, key) => {
      if (value[userId]) {
        delete value[userId];
        if (Object.keys(value).length === 0) {
          msg.reactions.delete(key);
        } else {
          msg.reactions.set(key, value);
        }
      }
    });

   
    const current = msg.reactions.get(emoji) || {};
    current[userId] = true;
    msg.reactions.set(emoji, current);

    await msg.save();

    const reactionCounts = {};
    msg.reactions.forEach((value, key) => {
      reactionCounts[key] = Object.keys(value).length;
    });

    res.status(200).json({ reactions: reactionCounts });

  } catch (err) {
    console.error('Erro ao processar reação:', err);
    res.status(500).json({ error: 'Erro ao reagir', details: err });
  }
});



router.post('/', auth, async (req, res) => {
  console.log('REQ.USERDATA', req.userData);
  try {
    const { content } = req.body;
    const author = req.userData.userId;

    if (!content) {
      return res.status(400).json({ error: 'Conteúdo da mensagem é obrigatório' });
    }

    const newMessage = new Message({
      content,
      author,
      createdAt: new Date()
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({ 
      message: 'Mensagem criada com sucesso', 
      msg: {
        ...savedMessage.toObject(),
        reactions: Object.fromEntries(savedMessage.reactions)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar mensagem', details: err });
  }
});


router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const msg = await Message.findById(req.params.id);

    if (!msg) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    if (msg.author.toString() !== req.userData.userId) {
      return res.status(403).json({ error: 'Acesso negado: você não é o autor da mensagem' });
    }

    msg.content = content;
    await msg.save();
    res.status(200).json({ message: 'Mensagem atualizada com sucesso', msg });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao editar mensagem', details: err });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);

    if (!msg) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    if (msg.author.toString() !== req.userData.userId) {
      return res.status(403).json({ error: 'Acesso negado: você não é o autor da mensagem' });
    }

    await Message.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Mensagem deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar mensagem', details: err });
  }
});


module.exports = router; 
