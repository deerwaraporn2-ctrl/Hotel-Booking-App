function BookingForm({ selectedRoom, onBook }) {
    const handleSubmit = (event) => {
        event.prevenDefault();

        const formData = new FormData(event.target);

        const booking = {
            roomType: selectedRoom, 
            guestName: formData.get("guestName"),
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

            <p>Selected room: {selectedRoom || "Please select a room first"}</p>

            <label>
                <input name="guestName" required />
            </label>

            <label>
                <input name="guestEmail" type="email" required />
            </label>
            
            <label>
                <input name="guestPhone" type="tel" required />
            </label>
           
            <label>
                <input name="checkIn" type="date" required />
            </label>
           
            <label>
                <input name="checkOut" type="date" required />
            </label>

            <button type="submit" disabled={!selectedRoom}>
                Book room
            </button>
        </form>
    )


}

export default BookingForm;