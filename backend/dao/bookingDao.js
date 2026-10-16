// database function
const database = require("../db");

async function getBookings() {
    const db = await database;
    const data = await db.all("SELECT * FROM bookings");
    return data;
}

async function createBooking(roomType, guestName, guestEmail, guestPhone, checkIn, checkOut) {
    const db = await database;
    
    const bookingResult = await db.run(
        `INSERT INTO bookings (room_type, guest_name, guest_email, guest_phone, check_in, check_out)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [roomType, guestName, guestEmail, guestPhone, checkIn, checkOut]
    );
    return bookingResult.lastID;
    
}

async function updateBooking(id, roomType, guestName, guestEmail, guestPhone, checkIn, checkOut) {
    const db = await database;

    await db.run(
       `UPDATE bookings
        SET room_type = ?, guest_name = ?, guest_email = ?, guest_phone = ?, check_in = ?, check_out = ?
        WHERE id = ?`, 
        [roomType, guestName, guestEmail, guestPhone, checkIn, checkOut. id]
    );
}


async function deleteBooking(id) {
    const db = await database;

    await db.run(
        "DELETE FROM bookings WHERE id = ?",
        [id]
    );
}


module.exports = { getBookings, createBooking, updateBooking, deleteBooking };