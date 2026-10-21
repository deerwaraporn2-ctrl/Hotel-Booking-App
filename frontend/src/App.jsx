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
    image: "/images/single_bedroom.webp",
  },
  {
    id: 2,
    name: "Double",
    description: "A relaxing room with one double bed.",
    image: "/images/double_bedroom.webp",
  },
  {
    id: 3,
    name: "Twin",
    description: "A room with two separate beds.",
    image: "/images/twin_bedroom.webp",
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

      <section>
        <h2>Choose your room</h2>

        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} />
        ))}
      </section>

      {selectedRoom && (
        <BookingForm selectedRoom={selectedRoom} onBook={handleBooking} />
      )}
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

      {message && messageType === "error" && (
        <p className="booking-error" role="alert">
          {message}
        </p>
      )}
    </main>
  );
}

export default App;
