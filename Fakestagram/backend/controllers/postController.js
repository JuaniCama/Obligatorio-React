const Post = require("../models/Post");
const User = require("../models/User");
const { createNotification } = require('./notificationController');
const multer = require("multer");

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Subir publicación
const uploadPost = async (req, res) => {
  const { caption } = req.body;
  try {
    const post = new Post({
      user: req.user._id,
      imageUrl: req.file.path,
      caption,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener el feed
const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "username profilePicture");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Verificar si el post existe
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Comprobar si el usuario ya ha dado like al post
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "Ya has dado like a este post" });
    }

    // Agregar el like al post
    post.likes.push(req.user.id);
    await post.save();

    // Crear notificación
    await createNotification(post.user, req.user.id, 'like', `${req.user.username} le ha dado like a tu publicación`, postId);

    // Devolver el post actualizado
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const removeLike = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Comprobar si el usuario ya ha dado like al post
    const likeIndex = post.likes.indexOf(req.user.id);
    if (likeIndex === -1) {
      return res.status(400).json({ message: "No has dado like a este post" });
    }

    // Eliminar el like del post
    post.likes.splice(likeIndex, 1);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const getLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    // Verificar si el post existe
    const post = await Post.findById(postId).populate("likes", "username profilePicture");
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Obtener los usuarios que dieron like
    const likeUsers = post.likes;

    res.status(200).json(likeUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { uploadPost, getFeed, upload, likePost, removeLike, getLikes };

