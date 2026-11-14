
 // Database connection and table setup

// Loads environment variables from the .env file
require("dotenv").config();

// Imports the createClient function from the Turso library
const { createClient } = require("@libsql/client");

// Connects to the database
async function connectDatabase() {
    try {
        // Creates a connection to the Turso cloud database
        const database = createClient({
            // Gets the database URL from the .env file
            url: process.env.TURSO_DATABASE_URL,

            // Gets the authentication token from the .env file
            authToken: process.env.TURSO_AUTH_TOKEN
        });

        // Creates the bookings table if it does not already exist
        await database.execute(`
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

        // Displays a message when the database connection is ready
        console.log("Connected to Turso database");

        // Returns the database connection so other files can use it
        return database;

    } catch (err) {
        // Catches and displays errors during connection or table creation
        console.error("Error connecting to Turso database:", err.message);

        // Passes the error to the calling code
        throw err;
    }
}

// Runs the connection function when this file is loaded
// Exports the database promise so other files can access it
module.exports = connectDatabase();
