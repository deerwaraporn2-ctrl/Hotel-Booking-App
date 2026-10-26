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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(`Delete booking #${id}?`);
    if (!confirmed) return;

    try {
      await fetchData(`admin/bookings/${id}`, "DELETE", null, {
        "x-admin-password": password,
      });
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (err) {
      setError("Could not delete booking.");
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
      {error && <p role="alert">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Guest</th>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.guest_name}</td>
              <td>{booking.room_type}</td>
              <td>{booking.check_in}</td>
              <td>{booking.check_out}</td>
              <td>{booking.guest_email}</td>
              <td>
                <button onClick={() => handleDelete(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
