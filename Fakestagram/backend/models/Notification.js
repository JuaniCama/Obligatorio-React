const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que recibe la notificación
  causer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que causa la notificación
  type: { type: String, required: true }, // Tipo de notificación (like, comment, etc.)
  message: { type: String, required: true }, // Mensaje de la notificación
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false }, // Post relacionado con la notificación (opcional)
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false }, // Comentario relacionado con la notificación (opcional)
  createdAt: { type: Date, default: Date.now }, // Fecha de creación de la notificación
  read: { type: Boolean, default: false } // Estado de la notificación (leída o no leída)
});

module.exports = mongoose.model('Notification', notificationSchema);