// Shows full details of one event with RSVP button
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

const EventDetail = () => {
  const { id } = useParams();
  const { events, rsvpEvents, rsvpForEvent } = useEvents();
  const [event, setEvent] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Find the event by ID
  useEffect(() => {
    const foundEvent = events.find(e => e.id === parseInt(id));
    setEvent(foundEvent);
  }, [id, events]);

  const handleRsvp = () => {
    rsvpForEvent(parseInt(id));
    setShowConfirm(true);
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  const isRsvp = rsvpEvents.includes(event.id);

  return (
    <div className="event-detail">
      <Link to="/" className="btn" style={{ marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Events
      </Link>
      
      {/* Event hero section */}
      <div className="event-hero">
        <h1>{event.title}</h1>
        <div className="hero-meta">
          <div><strong>{event.type}</strong> Event</div>
          <div>📍 {event.location}</div>
          <div>👤 {event.host}</div>
        </div>
        <div>
          📅 {new Date(event.date).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* RSVP status */}
      {isRsvp && !showConfirm && (
        <div className="rsvp-status rsvp-success">
          ✅ You're registered for this event!
        </div>
      )}

      {/* Event description */}
      <div className="event-description-full">
        <h3>About this event</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4a5568' }}>
          {event.description}
        </p>
      </div>

      {/* RSVP Button */}
      {!isRsvp && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            className="btn" 
            style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
            onClick={handleRsvp}
          >
            🎉 Join this Event
          </button>
        </div>
      )}

      {/* Confirmation message */}
      {showConfirm && (
        <div className="rsvp-status rsvp-success" style={{ marginTop: '2rem' }}>
          <h3>🎉 Registration Successful!</h3>
          <p>You've successfully RSVP'd for <strong>{event.title}</strong></p>
          <p>Check your email for confirmation details.</p>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
