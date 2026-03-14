import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

/**
 * @desc Admin Login
 * @route POST /api/admin/login
 * @access Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // 2. Find admin and include password
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin || !(await admin.comparePassword(password, admin.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 3. Generate token and send response
    const token = generateToken(admin._id);

    // Remove password from output
    admin.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      data: {
        admin
      }
    });

  } catch (error) {
    console.error('❌ LOGIN ERROR:', error.message);
    
    // Check if it's a JWT related error (usually missing secret)
    if (error.message && error.message.includes('secretOrPrivateKey')) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: JWT_SECRET is missing.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }

};

/**
 * @desc Change Admin Password
 * @route PATCH /api/admin/auth/update-password
 * @access Private (Admin)
 */
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // 1. Get admin from request (attached by protectAdmin middleware)
    // We need to fetch it with password to compare
    const admin = await Admin.findById(req.admin._id).select('+password');

    // 2. Check if current password is correct
    if (!(await admin.comparePassword(currentPassword, admin.password))) {
      return res.status(401).json({
        success: false,
        message: 'Your current password is incorrect'
      });
    }

    // 3. Update password (will be hashed by pre-save hook)
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Update Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update password'
    });
  }
};
