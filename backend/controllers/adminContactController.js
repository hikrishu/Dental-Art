import Contact from '../models/Contact.js';

/**
 * @desc Get all contact messages with search and filter
 * @route GET /api/admin/contacts
 * @access Private (Admin)
 */
export const getContacts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // Search by name, email or phone
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Fetch Contacts Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages'
    });
  }
};

/**
 * @desc Get single contact detail
 * @route GET /api/admin/contacts/:id
 * @access Private (Admin)
 */
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Fetch Contact Detail Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact message detail'
    });
  }
};

/**
 * @desc Mark contact as read
 * @route PATCH /api/admin/contacts/:id/read
 * @access Private (Admin)
 */
export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: contact
    });
  } catch (error) {
    console.error('Update Read Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update message status'
    });
  }
};
