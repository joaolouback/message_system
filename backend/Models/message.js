const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Definição do schema de Mensagem
   - content: texto da mensagem (obrigatório)
   - author: referência ao usuário que criou a mensagem (obrigatório)
   - createdAt: data e hora de criação, com valor padrão de agora
*/
const messageSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
