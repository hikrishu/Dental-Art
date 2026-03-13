import { sendContactEmail } from '../utils/emailService.js';
import { generateContactWhatsAppLink } from '../utils/whatsappService.js';
import Contact from '../models/Contact.js';

/**
 * Simple email format check — no library needed
 */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Controller to handle incoming Contact Form submissions
 */
export const submitContactMessage = async (req, res) => {
  console.log('✉️ Received new Contact Form message...');
  
  const name    = (req.body.name    || '').trim();
  const email   = (req.body.email   || '').trim().toLowerCase();
  const phone   = (req.body.phone   || '').trim();
  const message = (req.body.message || '').trim();

  const errors = {};
  if (!name)              errors.name    = 'Your name is required.';
  if (!email)             errors.email   = 'Your email is required.';
  else if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!message)           errors.message = 'Please write your question or consultation.';
  if (message.length > 2000) errors.message = 'Message must be under 2000 characters.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // 1. Save to MongoDB
    await Contact.create({ name, email, phone, message });

    // 2. Generate WhatsApp link
    const whatsappLink = generateContactWhatsAppLink({ name, email, message });

    // 3. Send Email (Optional but helpful)
    try {
      await sendContactEmail({ name, email, message });
    } catch (emailError) {
      console.error('⚠️ Contact Email Failed (Resend):', emailError.message);
    }

    console.log(`✅ Contact message saved and alerts sent for ${name}`);
    
    return res.status(200).json({
      success: true,
      message: 'Your message has been received! We will get back to you soon.',
      whatsappLink,
    });

  } catch (error) {
    console.error('❌ Error processing contact message:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process your message. Please try again later.',
    });
  }
};


