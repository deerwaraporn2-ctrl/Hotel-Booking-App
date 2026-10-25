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

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hotel Booking API");
});

// Read: show all bookings
app.get("/bookings", async (req, res) => {
    try {
        const data = await getBookings();
        res.json(data);
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
        res.status(500).json({ message: "Something went wrong" });
    }
});
// Public Route
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

// Update: change a booking

app.put("/bookings/:id", async (req, res) => {
    const { id } = req.params;
    const {
        roomType,
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut
    } = req.body;

    try {
        const changes = await updateBooking(
            id,
            roomType,
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut
        );

        if (changes === 0) {
            return res.status(404).json({
                message: `Booking ${id} not found.`
            });
        }

        res.json({ message: `Booking updated, id ${id}` });
    } catch (error) {
        console.error("Something went wrong:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


// Delete: remove a booking
app.delete("/bookings/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await deleteBooking(id);
        res.json({ message: `Booking removed, id ${id}` });
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
        res.status(500).json({ message: "Something went wrong" });
    }
});
/* Secret admin endpoints */
// List all bookings
app.get("/admin-secret-bookings", async (req, res) => {
  try {
    const data = await getBookings();
    res.json(data);
  } catch (error) {
    console.error("Could not fetch bookings:", error);
    res.status(500).json({ message: "Could not fetch bookings." });
  }
});

// Update a booking

app.put("/admin-secret-bookings/:id", async (req, res) => {
    const { id } = req.params;
    const {
        roomType,
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut
    } = req.body;

    try {
        const changes = await updateBooking(
            id,
            roomType,
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut
        );

        if (changes === 0) {
            return res.status(404).json({
                message: `Booking ${id} not found.`
            });
        }

        res.json({ message: `Booking ${id} updated.` });
    } catch (error) {
        console.error("Could not update booking:", error);
        res.status(500).json({
            message: "Could not update booking."
        });
    }
});

// Delete a booking
app.delete("/admin-secret-bookings/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    await deleteBooking(id);
    res.json({ message: `Booking ${id} deleted.` });
  } catch (error) {
    console.error("Could not delete booking:", error);
    res.status(500).json({ message: "Could not delete booking." });
  }
});
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
