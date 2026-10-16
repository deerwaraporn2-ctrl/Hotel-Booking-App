// receives req and res
const database = require("./db");
const express = require("express");
const cors = require("cors");

const {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking
} = require("./dao/bookingDao");

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
        console.log(`Något gick fel: ${error}`);
        res.status(500).json({ message: "Något gick fel" });
    }
});

// Create: add a booking
app.post("/bookings", async (req, res) => {
    const { roomType, guestName, guestEmail, guestPhone, checkIn, checkOut } = req.body;

    try {
        const data = await createBooking(
            roomType, guestName, guestEmail, guestPhone, checkIn, checkOut
        );
        res.json({ message: `Bokning skapad, id ${data}` });
    } catch (error) {
        console.log(`Något gick fel: ${error}`);
        res.status(500).json({ message: "Något gick fel" });
    }
});

// Update: change a booking
app.put("/bookings/:id", async (req, res) => {
    const { id } = req.params;
    const { roomType, guestName, guestEmail, guestPhone, checkIn, checkOut } = req.body;

    try {
        await updateBooking(
            id, roomType, guestName, guestEmail, guestPhone, checkIn, checkOut
        );
        res.json({ message: `Bokning uppdaterad, id ${id}` });
    } catch (error) {
        console.log(`Något gick fel: ${error}`);
        res.status(500).json({ message: "Något gick fel" });
    }
});

// Delete: remove a booking
app.delete("/bookings/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await deleteBooking(id);
        res.json({ message: `Bokning borttagen, id ${id}` });
    } catch (error) {
        console.log(`Något gick fel: ${error}`);
        res.status(500).json({ message: "Något gick fel" });
    }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});