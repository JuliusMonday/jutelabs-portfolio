import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Setup env
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    await connectDB();

    const username = process.argv[2];
    const password = process.argv[3];

    if (!username || !password) {
      console.log('Usage: node createAdmin.js <username> <password>');
      process.exit(1);
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      console.log('User already exists');
      process.exit(1);
    }

    const user = await User.create({
      username,
      password,
    });

    console.log(`Admin user created: ${user.username}`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
