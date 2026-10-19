// database connectin and table set up
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Ansluter till databasen
async function connectDatabase() {
    try {
        // Öppnar databasen
        const database = await open({
            filename: "./bookings.db",
            driver: sqlite3.Database
        });

        // Skapar tabellen bookings om den inte redan finns
        await database.run(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                room_type TEXT NOT NULL,
                guest_name TEXT NOT NULL,
                guest_email TEXT NOT NULL,
                guest_phone TEXT NOT NULL,
                check_in TEXT NOT NULL,
                check_out TEXT NOT NULL
            )
        `);

        console.log("Ansluten till databasen");

        // Returnerar databasen så att jag kan använda den i server.js
        return database;

    } catch (err) {
        // Fångar och visar fel vid anslutning eller skapande av tabell
        console.error("Fel vid anslutning eller skapande av tabell:", err.message);

        // Skickar felet vidare
        throw err;
    }
}

// Kör funktionen när filen laddas
module.exports = connectDatabase();

