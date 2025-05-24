import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import scheduleRoutes from './routes/schedule.route.js';

dotenv.config();

const app = express();

// 🔐 Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// 🔗 Routes
app.use('/api/schedule', scheduleRoutes);

// 🌐 MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Express server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Stop the app if DB fails
  }
};

connectToDatabase();

export default app;
