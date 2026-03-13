import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
    },
    preferredDate: {
      type: String,
      required: [true, 'Preferred date is required'],
    },
    preferredTime: {
      type: String,
      default: 'Any Time',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    // Tracks the state of the request - useful for admin panel
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'New',
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
