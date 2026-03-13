import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import { sendAppointmentEmail } from '../utils/emailService.js';
import { generateWhatsAppLink } from '../utils/whatsappService.js';

/** Simple regex helpers — no libraries needed */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^[\d\s\+\-\(\)]{7,20}$/.test(phone);

/**
 * Controller to handle Appointment Form submissions.
 */
export const createAppointment = async (req, res) => {
  console.log('📝 Received new Appointment Request...');
  
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      error: 'Database is not connected. Please try again later.',
    });
  }

  const fullName      = (req.body.fullName      || '').trim();
  const phone         = (req.body.phone         || '').trim();
  const email         = (req.body.email         || '').trim().toLowerCase();
  const service       = (req.body.service       || '').trim();
  const preferredDate = (req.body.preferredDate || '').trim();
  const preferredTime = (req.body.preferredTime || 'Any Time').trim();
  const message       = (req.body.message       || '').trim();

  const errors = {};

  if (!fullName)                    errors.fullName      = 'Full name is required.';
  if (!phone)                       errors.phone         = 'Phone number is required.';
  else if (!isValidPhone(phone))    errors.phone         = 'Please enter a valid phone number.';
  if (!email)                       errors.email         = 'Email address is required.';
  else if (!isValidEmail(email))    errors.email         = 'Please enter a valid email address.';
  if (!service)                     errors.service       = 'Please select a service.';
  if (!preferredDate)               errors.preferredDate = 'Please select a preferred date.';
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(preferredDate);
    if (chosen < today) errors.preferredDate = 'Preferred date cannot be in the past.';
  }
  if (message.length > 1000)        errors.message       = 'Notes must be under 1000 characters.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // 1. Save appointment to MongoDB
    const appointment = await Appointment.create({
      fullName,
      phone,
      email,
      service,
      preferredDate,
      preferredTime,
      message,
    });

    // 2. Generate WhatsApp Link
    const whatsappLink = generateWhatsAppLink({
      fullName,
      phone,
      service,
      preferredDate,
      preferredTime,
      message
    });

    // 3. Attempt to send email notification (Resend)
    try {
      await sendAppointmentEmail({ fullName, phone, email, service, preferredDate, preferredTime, message });
    } catch (emailError) {
      console.error('⚠️ Email Notification Failed (Resend):', emailError.message);
    }

    console.log(`✅ Appointment saved for ${fullName}`);
    
    return res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully!',
      appointment,
      whatsappLink // Return the link to the frontend
    });

  } catch (error) {
    console.error('❌ Database Error creating appointment:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to save appointment request. Please try again.',
    });
  }
};

