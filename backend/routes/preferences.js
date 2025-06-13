// backend/routes/preferences.js

/* Importações e configuração inicial do router Express */
const express = require('express');
const router = express.Router();
const Preference = require('../models/preference');

/*
 POST /preferences
 - Recebe no corpo JSON: { user, theme, notification, newsletter }
 - Cria um novo documento de Preferência associado ao usuário
 - Retorna status 201 e o objeto criado em { preference }
 - Em caso de erro, retorna status 500 com detalhes
*/
router.post('/', async (req, res) => {
    try {
        const { user, theme, notification, newsletter } = req.body;
        const pref = new Preference({ user, theme, notification, newsletter });
        const saved = await pref.save();
        res.status(201).json({ preference: saved });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar preferências', details: err });
    }
});

/*
 GET /preferences/:userId
 - Recupera todas as preferências do usuário informado via params
 - Retorna o array em { preferences }
 - Em caso de erro, retorna status 500 com detalhes
*/
router.get('/:userId', async (req, res) => {
    try {
        const prefs = await Preference.find({ user: req.params.userId });
        res.json({ preferences: prefs });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar preferências', details: err });
    }
});

module.exports = router;
