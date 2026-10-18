function RoomCard({ room, onSelect }) {
    return (
        <article>
            <img src={room.image} alt={room.name} />

            <h2>{room.name}</h2>
            <p>{room.description}</p>

            <button onClick={() => onSelect(room.name) }>
                Select room
            </button>
        </article>
    )

}

export default RoomCard;