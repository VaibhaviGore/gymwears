const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

const products = [
  {
    name: "PHANTOM PERFORMANCE TEE",
    price: 45,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800",
    description: "Engineered for maximum breathability and unrestricted movement.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "APEX LIFT HOODIE",
    price: 85,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    description: "Premium heavyweight cotton blend for warmups and cool downs.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "VELOCITY TRAINER V2",
    price: 120,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
    description: "Responsive cushioning meets stability for dynamic workouts.",
    sizes: ["8", "9", "10", "11", "12"]
  },
  {
    name: "STEALTH COMPRESSION SHORT",
    price: 35,
    category: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800",
    description: "Muscle support and sweat-wicking technology.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "TITAN GYM BAG",
    price: 60,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    description: "Durable tactical design with dedicated shoe compartment.",
    sizes: ["One Size"]
  },
  {
    name: "CORE IMPACT TANK",
    price: 30,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=800",
    description: "Minimalist cut for maximum airflow.",
    sizes: ["S", "M", "L", "XL"]
  }
];

mongoose.set('strictQuery', false);

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Insert mock data
    await Product.insertMany(products);
    console.log('Seed successful: inserted mock products!');

    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
