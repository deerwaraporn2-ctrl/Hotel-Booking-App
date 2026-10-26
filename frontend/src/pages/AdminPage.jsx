import { useState } from "react";
import { fetchData } from "../functions/fetchData";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await fetchData("admin/bookings", "GET", null, {
        "x-admin-password": password,
      });
      setBookings(data);
      setIsLoggedIn(true);
    } catch (err) {
      setError("Wrong password. Please try again.");
    }
  };

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleLogin}>
        <h1>Admin login</h1>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Log in</button>
        {error && <p role="alert">{error}</p>}
      </form>
    );
  }

  return (
    <div>
      <h1>Bookings ({bookings.length})</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            #{booking.id} {booking.guest_name}, {booking.room_type},{" "}
            {booking.check_in} to {booking.check_out}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;