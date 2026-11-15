// API Server: receives req and res
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking
} = require("./dao/bookingDao");
const requireAdmin = require("./middleware/requireAdmin");
const validateBooking = require("./middleware/validateBooking");

const app = express();

// Defines which frontend origins are allowed to access the API
const allowedOrigins = [
    "http://localhost:5173",
    "https://deerwaraporn2-ctrl.github.io"
];

// Configures CORS to allow requests from the specified origins
app.use(cors({
    origin: allowedOrigins
}));

// Allows Express to read JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hotel Booking API");
});

// Create: add a booking
app.post("/bookings", validateBooking, async (req, res) => {
    const { roomType, guestName, guestEmail, guestPhone, checkIn, checkOut } = req.body;

    try {
        const data = await createBooking(
            roomType, guestName, guestEmail, guestPhone, checkIn, checkOut
        );
        res.status(201).json({ id: data, message: `Booking created, id ${data}` });
    } catch (error) {
        console.log(`Somthing went wrong: ${error}`);
        res.status(500).json({ message: "Something went wrong" });
    }
});

/* ---------- Admin (password required) ---------- */

// Read: list all bookings
app.get("/admin/bookings", requireAdmin, async (req, res) => {
    try {
        const data = await getBookings();
        res.json(data);
    } catch (error) {
        console.error("Could not fetch bookings:", error);
        res.status(500).json({ message: "Could not fetch bookings." });
    }
});

// Update: change a booking
app.put("/admin/bookings/:id", requireAdmin, validateBooking, async (req, res) => {
    const { id } = req.params;
    const { roomType, guestName, guestEmail, guestPhone, checkIn, checkOut } = req.body;

    try {
        const changes = await updateBooking(
            id, roomType, guestName, guestEmail, guestPhone, checkIn, checkOut
        );

        if (changes === 0) {
            return res.status(404).json({ message: `Booking ${id} not found.` });
        }

        res.json({ message: `Booking ${id} updated.` });
    } catch (error) {
        console.error("Could not update booking:", error);
        res.status(500).json({ message: "Could not update booking." });
    }
});

// Delete: remove a booking
app.delete("/admin/bookings/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const changes = await deleteBooking(id);

        if (changes === 0) {
            return res.status(404).json({ message: `Booking ${id} not found.` });
        }

        res.json({ message: `Booking ${id} deleted.` });
    } catch (error) {
        console.error("Could not delete booking:", error);
        res.status(500).json({ message: "Could not delete booking." });
    }
});

// Starts the server locally when running this file directly
if (require.main === module) {

    // Uses the environment port if available, otherwise port 5001
    const PORT = process.env.PORT || 5001;

    // Starts the Express server
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

// Exports the Express app so Vercel can handle incoming requests
module.exports = app;