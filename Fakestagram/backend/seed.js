const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');  // Importa el modelo Post

dotenv.config();

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

// Datos de ejemplo (seed data)
const seedPosts = [
  {
    user: new mongoose.Types.ObjectId('672004e02c8ef194c6ac4c12'),  // Convertir el user a ObjectId con `new`
    caption: 'First post description',
    imageUrl: 'https://us-tuna-sounds-images.voicemod.net/7adcf47e-da88-45ef-9d80-8596a60ef44f-1663122730417.png',
    likes: [],
  },
  {
    user: new mongoose.Types.ObjectId('672004e02c8ef194c6ac4c12'),  // Convertir el user a ObjectId con `new`
    caption: 'Second post description',
    imageUrl: 'https://i.pinimg.com/236x/58/f4/0e/58f40eac70b39cce2a9ea043bd0f5278.jpg',
    likes: [],
  },
  {
    user: new mongoose.Types.ObjectId('6722592bdad428829fd92d95'),  // Convertir el user a ObjectId con `new`
    caption: 'Third post description',
    imageUrl: 'https://i0.wp.com/coolhuntermx.com/wp-content/uploads/2022/07/Shrek_meme_coolhuntermx_2022_3.jpg?ssl=1',
    likes: [],
  },
];

// Función para agregar los datos de ejemplo
const seedDB = async () => {
  try {
    await Post.deleteMany();  // Borra los posts existentes si quieres limpiar la colección
    await Post.insertMany(seedPosts);  // Inserta los posts de ejemplo
    console.log('Database seeded with posts');
    process.exit();  // Salir del script después de ejecutar
  } catch (error) {
    console.error('Error seeding database', error);
    process.exit(1);
  }
};

// Ejecutar la función
const runSeeder = async () => {
  await connectDB();
  await seedDB();
};

runSeeder();
