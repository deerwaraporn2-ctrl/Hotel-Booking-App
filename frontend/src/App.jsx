// Manage the selected room, display the three room cards,
// and connect the booking form to backend.
import { useState } from "react";
import Header from "./components/Header";
import RoomCard from "./components/RoomCard";
import BookingForm from "./components/BookingForm";
import { fetchData } from "./functions/fetchData";
import "./App.css";

const rooms = [
  {
    id: 1,
    name: "Single",
    description: "A comfortable room for one guest.",
    image: "/images/room-single.webp",
  },
  {
    id: 2,
    name: "Double",
    description: "A relaxing room with one double bed.",
    image: "/images/room-double.webp",
  },
  {
    id: 3,
    name: "Twin",
    description: "A room with two separate beds.",
    image: "/images/room-twin.webp",
  },
];

function App() {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleBooking = async (booking) => {
    setMessage("");
    setMessageType("");

    if (booking.checkOut <= booking.checkIn) {
      setMessage("Check-out must be after check-in.");
      setMessageType("error");
      return;
    }

    try {
      const data = await fetchData("bookings", "POST", booking);
      setMessage(data.message);
      setMessageType("success");
    } catch (error) {
      setMessage("Could not create booking. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <main>
      <Header />

      {/* hero section */}
      <section className="hero-section">
        <img
          className="hero-image"
          src="/images/Aurelia-hero.webp"
          alt="Welcoming boutique hotel lobby"
        />

        <div className="hero-content">
          <p>A PLACE TO UNWIND</p>
          <h2>Your stay, your sanctuary.</h2>
          <span>Thoughtful comfort. Beautiful moments.</span>
          <a href="#rooms" className="hero-button">
            Explore our rooms
          </a>
        </div>
      </section>

      {/* room selection */}
      <section className="room-section" id="rooms">
        <h2>Choose your room</h2>

        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} />
          ))}
        </div>
      </section>

      {/* booking form */}
      {selectedRoom && (
        <BookingForm selectedRoom={selectedRoom} onBook={handleBooking} />
      )}

      {/* success message */}
      {message && messageType === "success" && (
        <p className="booking-success" role="status">
          <span className="success-icon">✓</span>
          <span>
            <strong>Booking confirmed!</strong>
            <br />
            Thank you for choosing us. Your room has been booked successfully.
            <br />
            <small>{message}</small>
          </span>
        </p>
      )}
      
      {/*error message */} 
      {message && messageType === "error" && (
        <p className="booking-error" role="alert">
          {message}
        </p>
      )}
    </main>
  );
}

export default App;
