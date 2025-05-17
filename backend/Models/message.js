

const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  imagePath: { type: String },
  createdAt: { type: Date, default: Date.now },

  // 👇 CAMPO DE REAÇÕES
  reactions: {
    type: Map,
    of: Object,
    default: {}
  }
});

module.exports = mongoose.model('Message', messageSchema);
