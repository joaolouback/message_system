var express = require('express');
var router = express.Router();

/* Rota principal (GET /)
   - Renderiza a view 'index' usando o template engine configurado (ex: Handlebars)
*/
router.get('/', (req, res, next) => {
    res.render('index');
});

/* Rota de teste de mensagem (GET /message)
   - Retorna uma resposta JSON simples para validar endpoints ou teste de API
*/
router.get('/message', (req, res, next) => {
    res.json('index');
});

module.exports = router;