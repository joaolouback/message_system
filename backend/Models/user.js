const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

/* Definição do schema de Usuário
   - username: nome de usuário único e obrigatório
   - email: email único e obrigatório
   - password: senha criptografada, obrigatória
   - avatarUrl: URL da imagem de perfil (opcional)
*/
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String }
});

/* Middleware pré-save para hash de senha
   - Verifica se o campo 'password' foi modificado
   - Gera um salt e aplica bcrypt.hash antes de salvar
*/
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

/* Método de instância para comparar senhas
   - Recebe a senha em texto plano e compara com o hash armazenado
*/
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

/* Exporta o modelo 'User' para uso em CRUD e autenticação */
module.exports = mongoose.model('User', userSchema);
