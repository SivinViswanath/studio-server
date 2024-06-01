import express from 'express';
import json from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import subscriber from './routes/subscriber.js';
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Use built-in middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // Use built-in middleware for URL-encoded data parsing
app.get('/', async () => {
  console.log('hello');
}); // Routes
app.use('/api', subscriber);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
