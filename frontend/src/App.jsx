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

  const handleBooking = async (booking) => {
    if (booking.checkOut <= booking.checkIn) {
      setMessage("Check-out must be after check-in.");
      return;
    }

    try {
      const data = await fetchData("bookings", "POST", booking);
      setMessage(data.message);
    } catch (error) {
      setMessage("Could not create booking. Please try again.");
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

      {message && <p role="status">{message}</p>}
    </main>
  );
}

export default App;
