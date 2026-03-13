import Appointment from '../models/Appointment.js';

/**
 * @desc Get all appointments with search and filter
 * @route GET /api/admin/appointments
 * @access Private (Admin)
 */
export const getAppointments = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by name or phone
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const appointments = await Appointment.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Fetch Appointments Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments'
    });
  }
};

/**
 * @desc Get single appointment detail
 * @route GET /api/admin/appointments/:id
 * @access Private (Admin)
 */
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Fetch Appointment Detail Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment detail'
    });
  }
};

/**
 * @desc Update appointment status
 * @route PATCH /api/admin/appointments/:id/status
 * @access Private (Admin)
 */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status type'
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}`,
      data: appointment
    });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment status'
    });
  }
};
