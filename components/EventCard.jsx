// Simple card that shows event info and links to details
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="event-card">
      {/* Event category badge */}
      <div className="event-type">{event.type}</div>
      
      {/* Event title */}
      <h3>{event.title}</h3>
      
      {/* Date, location, host */}
      <div className="event-meta">
        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
        <span>📍 {event.location}</span>
        <span>👤 {event.host}</span>
      </div>
      
      {/* Short description */}
      <p className="event-description">{event.description}</p>
      
      {/* View details button */}
      <div style={{ textAlign: 'right' }}>
        <span className="btn">View Details →</span>
      </div>
    </Link>
  );
};

export default EventCard;
