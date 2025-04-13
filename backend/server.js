import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRoute from './routes/userRoute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to database and cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://doctor-apointment-booking.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable preflight across all routes
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRoute);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API working');
});

// Start server
app.listen(port, () => {
  console.log('Server listening on port:', port);
});
