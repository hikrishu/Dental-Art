import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Utility to send a contact form email using Resend
 * @param {Object} formData Contains name, email, and message
 */
export const sendContactEmail = async ({ name, email, message }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Dental Art <notifications@resend.dev>', // Note: Resend requires a verified domain or uses this default for testing
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #0d9488; border-bottom: 2px solid #ccfbf1; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p style="margin-top: 20px;"><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #475569;"><strong>Consultation / Question:</strong></p>
            <p style="margin-top: 8px; color: #1e293b; line-height: 1.5;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Resend Error (Contact):', error.message);
    throw error;
  }
};

/**
 * Utility to send an appointment request email using Resend
 * @param {Object} data - All appointment fields
 */
export const sendAppointmentEmail = async ({ fullName, phone, email, service, preferredDate, preferredTime, message }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Dental Art Appointments <notifications@resend.dev>',
      to: process.env.RECEIVER_EMAIL,
      subject: `New Appointment Request - Dental Art Clinic`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #0d9488; border-bottom: 2px solid #ccfbf1; padding-bottom: 10px;">
            📅 New Appointment Request
          </h2>
          <p>New appointment request received.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; color: #64748b; font-weight: bold; width: 40%; border-bottom: 1px solid #f1f5f9;">Full Name</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; color: #64748b; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Email</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; color: #64748b; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Phone</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; color: #64748b; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Service</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; color: #64748b; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Preferred Date</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${preferredDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px; color: #64748b; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Preferred Time</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${preferredTime || 'Any Time'}</td>
            </tr>
          </table>
          ${message ? `
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #475569;"><strong>Message:</strong></p>
            <p style="margin-top: 8px; color: #1e293b; line-height: 1.5;">${message}</p>
          </div>` : ''}
          <p style="margin-top: 24px; color: #1e293b;">
            Please contact the patient to confirm the appointment.
          </p>
          <p style="margin-top: 10px; color: #94a3b8; font-size: 12px;">
            This request was submitted via the Dental Art Clinic website.
          </p>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Resend Error (Appointment):', error.message);
    throw error;
  }
};

