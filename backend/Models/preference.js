/* Importa o Mongoose e extrai o construtor Schema */
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Definição do schema de Preferência
   - user: referência ao usuário dono da preferência (obrigatório)
   - theme: tema de interface, somente 'light' ou 'dark' (obrigatório)
   - notification: canal de notificação, somente 'email' ou 'sms' (obrigatório)
   - newsletter: opt-in para newsletter, booleano com padrão false
   - createdAt: timestamp de criação, padrão para o momento atual
*/
const preferenceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
        required: true
    },
    notification: {
        type: String,
        enum: ['email', 'sms'],
        required: true
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Preference', preferenceSchema);
