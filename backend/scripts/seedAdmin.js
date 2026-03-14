import mongoose from 'mongoose';
import Admin from '../models/Admin.js';


export const seedAdmin = async () => {
  console.log('🌱 Starting Admin seeding process...');
  try {
    // Check if connected to DB
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️  Skipping Admin seed: Database not connected (readyState:', mongoose.connection.readyState, ')');
      return;
    }

    const adminEmail = 'admin@dentalart.com';
    console.log(`🔍 Checking if admin ${adminEmail} exists...`);


    const adminExists = await Admin.findOne({ email: adminEmail });

    if (adminExists) {
      console.log('⚠️ Admin user already exists. Skipping seed.');
      return;
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

  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  }
};

