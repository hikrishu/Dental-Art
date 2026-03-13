import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@dentalart.com';
    const adminExists = await Admin.findOne({ email: adminEmail });

    if (adminExists) {
      console.log('⚠️ Admin user already exists');
      process.exit();
    }

    const admin = new Admin({
      name: 'Dental Art Admin',
      email: adminEmail,
      password: 'adminpassword123', // This will be hashed by the pre-save hook
      role: 'admin'
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@dentalart.com');
    console.log('🔑 Password: adminpassword123');
    console.log('⚠️ Please change your password after first login.');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
