const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');

router.route('/').post(createBooking);

module.exports = router;
