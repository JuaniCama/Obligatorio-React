const express = require('express');
const { getNotifications, markAsRead, deleteNotification } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para obtener las notificaciones de un usuario
router.get('/', protect, getNotifications);

// Ruta para marcar una notificación como leída
router.put('/:id/read', protect, markAsRead);

// Ruta para eliminar una notificación
router.delete('/:id', protect, deleteNotification);

module.exports = router;