import mongoose from 'mongoose';

/**
 * Connect to MongoDB using the URI from the .env file.
 * If MONGO_URI is not set or invalid, the server will continue running
 * without a database (contact form email will still work).
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  // Skip connection if using the placeholder value
  if (!uri || uri.includes('<username>')) {
    console.warn(
      '⚠️  MONGO_URI is not set. Skipping MongoDB connection.\n   Appointment saving is disabled until you add a valid MONGO_URI to backend/.env'
    );
    return;
  }

  try {
    console.log('⏳ Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('   Server will continue without MongoDB. Fix MONGO_URI in Render dashboard to enable saving.');
  }
};

export default connectDB;
