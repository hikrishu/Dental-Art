/**
 * WhatsApp Service Utility
 * Generates a pre-filled WhatsApp message link for the clinic
 */

export const generateWhatsAppLink = ({ fullName, phone, service, preferredDate, preferredTime, message }) => {
  const clinicPhone = process.env.CLINIC_PHONE_NUMBER || '911234567890'; // Default placeholder if not set
  
  const textMessage = `Hello Dental Art Clinic,

New appointment request:

Name: ${fullName}
Phone: ${phone}
Service: ${service}
Date: ${preferredDate}
Time: ${preferredTime || 'Any Time'}
Message: ${message || 'N/A'}`;

  const encodedMessage = encodeURIComponent(textMessage);
  
  return `https://wa.me/${clinicPhone}?text=${encodedMessage}`;
};

export const generateContactWhatsAppLink = ({ name, email, message }) => {
  const clinicPhone = process.env.CLINIC_PHONE_NUMBER || '911234567890';
  
  const textMessage = `Hello Dental Art Clinic,

New contact inquiry:

Name: ${name}
Email: ${email}
Message: ${message}`;

  const encodedMessage = encodeURIComponent(textMessage);
  
  return `https://wa.me/${clinicPhone}?text=${encodedMessage}`;
};

