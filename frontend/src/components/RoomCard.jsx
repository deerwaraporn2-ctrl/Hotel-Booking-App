
function RoomCard({ room, onSelect }) {
  return (
    <article className="room-card">
      <img src={room.image} alt={room.name} />

      <div className="room-card-content">
       
        <h2>{room.name}</h2>

        <p>{room.description}</p>

        <p className="room-price">
          <span>Price starts</span>
          <strong>{room.price.toLocaleString("sv-SE")} kr / night</strong>
        </p>

        <button onClick={() => onSelect(room.name)}>
          Select room
        </button>
      </div>
    </article>
  );
}

export default RoomCard;
