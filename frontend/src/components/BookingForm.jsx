function BookingForm({ selectedRoom, onBook }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const booking = {
      roomType: selectedRoom,
      guestName: `${formData.get("firstName")} ${formData.get("lastName")}`,
      guestEmail: formData.get("guestEmail"),
      guestPhone: formData.get("guestPhone"),
      checkIn: formData.get("checkIn"),
      checkOut: formData.get("checkOut"),
    };

    onBook(booking);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book your room</h2>

      <p className="selected-room">
        Selected room: {selectedRoom || "Please select a room first"}
      </p>

      <label>
        First name
        <input
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
        />
      </label>

      <label>
        Last name
        <input
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
        />
      </label>



      <label>
        Email adress
        <input
          name="guestEmail"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
        />
      </label>

      <label>
        Phone number
        <input
          name="guestPhone"
          type="tel"
          placeholder="+46 70 123 45 67"
          autoComplete="tel"
          required
        />
      </label>

      <label>
        Check-In
        <input name="checkIn" type="date" min={new Date().toISOString().split("T")[0]} required />
      </label>

      <label>
        Check-out
        <input name="checkOut" type="date" min={new Date().toISOString().split("T")[0]} required />
      </label>

      <button type="submit" disabled={!selectedRoom}>
        Book room
      </button>
    </form>
  );
}

export default BookingForm;
