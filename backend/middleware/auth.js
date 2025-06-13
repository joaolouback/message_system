/* Importações e configuração de ambiente */
const jwt = require('jsonwebtoken');
require('dotenv').config();

/* Middleware de autenticação JWT */
module.exports = (req, res, next) => {
    /* Extração e validação do header Authorization */
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    try {
        /* Verificação do token e extração do payload */
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.id;
        /* Chamada ao próximo middleware ou rota */
        next();
    } catch {
        /* Tratamento de erros de validação (expirado ou inválido) */
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};
