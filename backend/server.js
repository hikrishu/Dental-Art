import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import connectDB from './config/db.js';
import { seedAdmin } from './scripts/seedAdmin.js';
import contactRoutes from './routes/contactRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import adminAppointmentRoutes from './routes/adminAppointmentRoutes.js';
import adminContactRoutes from './routes/adminContactRoutes.js';

// Load environment variables
dotenv.config();

// Required Environment Variables Check
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'CLINIC_PHONE_NUMBER'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(`\n⚠️  WARNING: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.warn(`   The app may not function correctly on Render without these.\n`);
}

const app = express();


// --- 1. Connect to MongoDB & Auto-Seed Admin ---
await connectDB();
await seedAdmin();


// --- 2. Request Logger (For Render Debugging) ---
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  console.log(`   Origin: ${req.get('origin') || 'Local/No Origin'}`);
  next();
});

// --- 3. Security Middleware ---
// Set security HTTP headers
app.use(helmet());

// Limit requests from same IP (Prevent brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});

// Apply rate limiter specifically to forms
app.use('/api/', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10kb' })); // Body limit to prevent large payload attacks

// --- 3. Register Routes ---
app.use('/api/contact', contactRoutes);
app.use('/api/appointments', appointmentRoutes);

// --- 4. Admin Dashboard Routes ---
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/appointments', adminAppointmentRoutes);
app.use('/api/admin/contacts', adminContactRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// --- 4. Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 DENTAL ART BACKEND IS LIVE');
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('📝 Listening for frontend requests...');
});
