import { useState } from "react";
import { fetchData } from "../functions/fetchData";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({});

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

  const handleLogout = () => {
    setPassword("");
    setBookings([]);
    setEditingBooking(null);
    setEditForm({});
    setError("");
    setIsLoggedIn(false);
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

  const startEdit = (booking) => {
    setEditingBooking(booking);
    setEditForm({
      roomType: booking.room_type,
      guestName: booking.guest_name,
      guestEmail: booking.guest_email,
      guestPhone: booking.guest_phone,
      checkIn: booking.check_in,
      checkOut: booking.check_out,
    });
  };

  const handleEditChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await fetchData(`admin/bookings/${editingBooking.id}`, "PUT", editForm, {
        "x-admin-password": password,
      });

      // update the row on screen with the new values
      setBookings(
        bookings.map((booking) =>
          booking.id === editingBooking.id
            ? {
                ...booking,
                room_type: editForm.roomType,
                guest_name: editForm.guestName,
                guest_email: editForm.guestEmail,
                guest_phone: editForm.guestPhone,
                check_in: editForm.checkIn,
                check_out: editForm.checkOut,
              }
            : booking,
        ),
      );
      setEditingBooking(null);
    } catch (err) {
      setError(err.message || "Could not save booking.");
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
    <div className="admin-container">
      <div className="admin-header">
        <h1>Bookings ({bookings.length})</h1>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {error && <p role="alert">{error}</p>}

      {editingBooking && (
        <form onSubmit={handleSave}>
          <h2>Edit booking #{editingBooking.id}</h2>

          <label>
            Room
            <select
              name="roomType"
              value={editForm.roomType}
              onChange={handleEditChange}
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Twin">Twin</option>
            </select>
          </label>

          <label>
            Guest name
            <input
              name="guestName"
              value={editForm.guestName}
              onChange={handleEditChange}
            />
          </label>

          <label>
            Email
            <input
              name="guestEmail"
              type="email"
              value={editForm.guestEmail}
              onChange={handleEditChange}
            />
          </label>

          <label>
            Phone
            <input
              name="guestPhone"
              value={editForm.guestPhone}
              onChange={handleEditChange}
            />
          </label>

          <label>
            Check-in
            <input
              name="checkIn"
              type="date"
              value={editForm.checkIn}
              onChange={handleEditChange}
            />
          </label>

          <label>
            Check-out
            <input
              name="checkOut"
              type="date"
              value={editForm.checkOut}
              onChange={handleEditChange}
            />
          </label>
          <button type="submit">Save changes</button>
          <button type="button" onClick={() => setEditingBooking(null)}>
            Cancel
          </button>
        </form>
      )}
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
                <button onClick={() => startEdit(booking)}>Edit</button>{" "}
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
