const express = require('express');
const auth = require('../middleware/auth');
const Message = require('../Models/message');

const router = express.Router();

/*
 GET /messages
 - Acessível publicamente
 - Busca todas as mensagens e popula o autor (username, email, avatarUrl)
 - Retorna status 200 e o objeto { messages }
 - Em caso de erro, retorna status 500 com detalhes
*/
router.get('/', async (req, res) => {
    try {
        const messages = await Message
            .find({})
            .populate('author', 'username email avatarUrl');
        res.status(200).json({ messages });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar mensagens', details: err });
    }
});

/*
 POST /messages
 - Protegida pelo middleware auth (token JWT obrigatório)
 - Recebe 'content' no corpo da requisição
 - Cria nova mensagem associando req.userId como autor
 - Popula o autor antes de retornar
 - Retorna status 201 e o objeto { message }
*/
router.post('/', auth, async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'content é obrigatório' });
    }
    try {
        const newMsg = new Message({
            content,
            author: req.userId
        });
        const saved = await newMsg.save();
        const populated = await saved.populate('author', 'username email avatarUrl');
        res.status(201).json({ message: populated });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar mensagem', details: err });
    }
});

/*
 PUT /messages/:id
 - Protegida pelo middleware auth
 - Permite somente ao autor atualizar o conteúdo da mensagem
 - Verifica existência e autorização antes de salvar
 - Retorna a mensagem atualizada
*/
router.put('/:id', auth, async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'content é obrigatório' });
    }
    try {
        const msg = await Message.findById(req.params.id);
        if (!msg) {
            return res.status(404).json({ error: 'Mensagem não encontrada' });
        }
        if (msg.author.toString() !== req.userId) {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        msg.content = content;
        const updated = await msg.save();
        const populated = await updated.populate('author', 'username email avatarUrl');
        res.json({ message: populated });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar mensagem', details: err });
    }
});

/*
 DELETE /messages/:id
 - Protegida pelo middleware auth
 - Permite somente ao autor deletar sua mensagem
 - Verifica existência e autorização antes de remover
 - Retorna o objeto da mensagem removida
*/
router.delete('/:id', auth, async (req, res) => {
    try {
        const msg = await Message.findById(req.params.id);
        if (!msg) {
            return res.status(404).json({ error: 'Mensagem não encontrada' });
        }
        if (msg.author.toString() !== req.userId) {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        await msg.deleteOne();
        res.json({ message: msg });
    } catch (err) {
        console.error('Erro ao deletar mensagem:', err);
        res.status(500).json({ error: 'Erro ao deletar mensagem', details: err.message });
    }
});

module.exports = router;
