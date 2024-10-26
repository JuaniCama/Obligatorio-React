const User = require("../models/User");
const Post = require("../models/Post");

const getUserProfile = async (req, res) => {
  try {
    // Buscar al usuario por ID y excluir la contraseña
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("friends", "username profilePicture");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const posts = await Post.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      user,
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios sin mostrar las contraseñas
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const friend = await User.findById(req.params.friendId);

    if (!friend) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ message: "Este usuario ya es tu amigo" });
    }

    // Agregar el amigo al array de amigos del usuario
    user.friends.push(friend._id);
    await user.save();

    res.status(200).json({ message: "Amigo agregado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.body.username) {
      user.username = req.body.username;
    }

    if (req.body.profilePicture) {
      user.profilePicture = req.body.profilePicture;
    }

    await user.save();

    res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: {
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  getUserProfile,
  getAllUsers,
  addFriend,
  updateUserProfile,
};

