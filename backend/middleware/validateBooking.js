const ROOM_TYPES = ["Single", "Double", "Twin"];

// Checks the booking data before it reaches the database
function validateBooking(req, res, next) {
  const { roomType, guestName, guestEmail, guestPhone, checkIn, checkOut } = req.body;

  if (!roomType || !guestName || !guestEmail || !guestPhone || !checkIn || !checkOut) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!ROOM_TYPES.includes(roomType)) {
    return res.status(400).json({ message: "Invalid room type." });
  }

  // YYYY-MM-DD strings can be compared directly
  if (checkOut <= checkIn) {
    return res.status(400).json({ message: "Check-out must be after check-in." });
  }

  next();
}

module.exports = validateBooking;