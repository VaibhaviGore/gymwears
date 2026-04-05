const Booking = require('../models/Booking');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
    try {
        const { userId, name, email, classTitle, date, time, notes } = req.body;

        // Basic validation
        if (!name || !email || !classTitle || !date) {
            return res.status(400).json({ message: 'Name, email, classTitle, and date are required fields' });
        }

        const booking = new Booking({
            userId: userId ? userId : undefined,
            name,
            email,
            classTitle,
            date,
            time,
            notes
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createBooking
};
