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
    price: 1800,
    description: "A comfortable room for one guest.",
    image: "/images/room-single.webp",
  },
  {
    id: 2,
    name: "Double",
    price: 2200,
    description: "A relaxing room with one double bed.",
    image: "/images/room-double.webp",
  },
  {
    id: 3,
    name: "Twin",
    price: 2400,
    description: "A room with two separate beds.",
    image: "/images/room-twin.webp",
  },
];

function App() {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      setShowConfirmation(true);
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
            <RoomCard
              key={room.id}
              room={room}
              onSelect={(roomName) => {
                setSelectedRoom(roomName);

                setTimeout(() => {
                  document.getElementById("booking-form")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 100);
              }}
            />
          ))}
        </div>
      </section>

      {/* booking form */}
      {selectedRoom && (
        <div id="booking-form">
          <BookingForm selectedRoom={selectedRoom} onBook={handleBooking} />
        </div>
      )}

      {/* Booking confirmation popup */}
      {showConfirmation && messageType === "success" && (
        <div
          className="confirmation-overlay"
          onClick={() => setShowConfirmation(false)}
        >
          <section
            className="confirmation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              className="confirmation-image"
              src={rooms.find((room) => room.name === selectedRoom)?.image}
              alt={`${selectedRoom} room at Aurelia Retreat`}
            />

            <span className="confirmation-icon">✓</span>

            <h2 id="confirmation-title">Your stay is confirmed!</h2>

            <p>Thank you for choosing Aurelia Retreat.</p>
            <p>We look forward to welcoming you.</p>

            <div className="confirmation-divider" />

            <p className="confirmation-detail">{message}</p>

            <button
              className="confirmation-button"
              onClick={() => {
                setShowConfirmation(false);
                setSelectedRoom("");
              }}
            >
              Wonderful — see you soon!
            </button>
          </section>
        </div>
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
