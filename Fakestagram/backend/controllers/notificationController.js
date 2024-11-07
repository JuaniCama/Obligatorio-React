const Notification = require('../models/Notification');
const User = require('../models/User');

// Crear una nueva notificación
const createNotification = async (userId, causerId, type, message, postId = null, commentId = null) => {
  try {
    const notification = new Notification({
      user: userId,
      causer: causerId,
      type,
      message,
      post: postId,
      comment: commentId
    });
    await notification.save();
  } catch (error) {
    console.error('Error al crear la notificación:', error);
  }
};

// Obtener las notificaciones de un usuario
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('causer', 'username profilePicture'); // Popular la información del usuario que causó la notificación
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error al obtener las notificaciones:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Marcar una notificación como leída
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    notification.read = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    console.error('Error al marcar la notificación como leída:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Eliminar una notificación
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    await notification.deleteOne();
    res.status(200).json({ message: 'Notificación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la notificación:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = { createNotification, getNotifications, markAsRead, deleteNotification };