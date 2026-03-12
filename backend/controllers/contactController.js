import { sendContactEmail } from '../utils/emailService.js';

/**
 * Simple email format check — no library needed
 */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Controller to handle incoming Contact Form submissions
 * 1. Validates and sanitizes input
 * 2. Calls email utility
 * 3. Returns success/error JSON response
 */
export const submitContactMessage = async (req, res) => {
  // Trim all incoming string values upfront
  const name    = (req.body.name    || '').trim();
  const email   = (req.body.email   || '').trim().toLowerCase();
  const message = (req.body.message || '').trim();

  // Per-field validation with clear, specific messages
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
    await sendContactEmail({ name, email, message });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    });

  } catch (error) {
    console.error('Error sending contact email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send your message. Please try again later.',
    });
  }
};
