// This file manages all app data like events list and user RSVPs
import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvents must be used inside EventProvider');
  return context;
};

export const EventProvider = ({ children }) => {
  // All events from JSON file
  const [allEvents, setAllEvents] = useState([]);
  // Filtered events (what user sees)
  const [filteredEvents, setFilteredEvents] = useState([]);
  // User filter choices
  const [filters, setFilters] = useState({ type: '', location: '', date: '' });
  const [loading, setLoading] = useState(true);
  // Events user has RSVPed for
  const [rsvpEvents, setRsvpEvents] = useState([]);

  // Load events when app starts
  useEffect(() => {
    fetch('/data/events.json')
      .then(res => res.json())
      .then(data => {
        setAllEvents(data.events);
        setFilteredEvents(data.events); // Show all events first
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply user's filters
  const applyFilters = () => {
    let results = [...allEvents];
    
    if (filters.type) {
      results = results.filter(event => event.type === filters.type);
    }
    if (filters.location) {
      results = results.filter(event => 
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.date) {
      results = results.filter(event => event.date === filters.date);
    }
    
    setFilteredEvents(results);
  };

  // Clear all filters and show all events
  const clearFilters = () => {
    setFilters({ type: '', location: '', date: '' });
    setFilteredEvents(allEvents);
  };

  // User RSVPs for an event
  const rsvpForEvent = (eventId) => {
    setRsvpEvents(prev => [...prev, eventId]);
  };

  // Share all this data with other components
 const value = {
  events: filteredEvents,  // Not used by HomePage anymore
  allEvents,               // HomePage uses this directly
  filters,
  setFilters,
  applyFilters,
  clearFilters,
  loading,
  rsvpEvents,
  rsvpForEvent
};

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
