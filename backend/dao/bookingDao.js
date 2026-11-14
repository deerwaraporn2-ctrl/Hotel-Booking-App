
// Database functions

// Imports the database connection from db.js
const database = require("../db");

// Gets all bookings from the database
async function getBookings() {
    // Waits for the database connection
    const db = await database;

    // Executes a SELECT query to retrieve all bookings
    const result = await db.execute("SELECT * FROM bookings");

    // Returns the rows containing the bookings
    return result.rows;
}

// Creates a new booking
async function createBooking(roomType, guestName, guestEmail, guestPhone, checkIn, checkOut) {
    // Waits for the database connection
    const db = await database;

    // Inserts a new booking using placeholders to safely pass values
    const result = await db.execute({
        sql: `INSERT INTO bookings
            (room_type, guest_name, guest_email, guest_phone, check_in, check_out)
            VALUES (?, ?, ?, ?, ?, ?)`,
        args: [roomType, guestName, guestEmail, guestPhone, checkIn, checkOut]
    });

    // Returns the ID of the newly created booking
    return Number(result.lastInsertRowid);
}

// Updates an existing booking
async function updateBooking(id, roomType, guestName, guestEmail, guestPhone, checkIn, checkOut) {
    // Waits for the database connection
    const db = await database;

    // Updates the booking with the matching ID
    const result = await db.execute({
        sql: `UPDATE bookings
            SET room_type = ?, guest_name = ?, guest_email = ?, guest_phone = ?, check_in = ?, check_out = ?
            WHERE id = ?`,
        args: [roomType, guestName, guestEmail, guestPhone, checkIn, checkOut, id]
    });

    // Returns the number of rows that were updated
    return Number(result.rowsAffected);
}

// Deletes a booking
async function deleteBooking(id) {
    // Waits for the database connection
    const db = await database;

    // Deletes the booking with the matching ID
    const result = await db.execute({
        sql: "DELETE FROM bookings WHERE id = ?",
        args: [id]
    });

    // Returns the number of rows that were deleted
    return Number(result.rowsAffected);
}

// Exports all database functions so other files can use them
module.exports = { getBookings, createBooking, updateBooking, deleteBooking };
