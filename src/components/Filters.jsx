// Filters only update filter state, HomePage handles display
import React from 'react';
import { useEvents } from '../context/EventContext';

const Filters = () => {
  const { filters, setFilters, allEvents } = useEvents();

  const getUniqueTypes = () => [...new Set(allEvents.map(event => event.type))];
  const getUniqueLocations = () => [...new Set(allEvents.map(event => event.location))];

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const hasFilters = filters.type || filters.location || filters.date;

  return (
    <section className="filters">
      <h2>🔍 Find Your Event</h2>
      
      <div className="filter-row">
        <div className="filter-group">
          <label>Event Type</label>
          <select value={filters.type} onChange={(e) => handleChange('type', e.target.value)}>
            <option value="">All Types</option>
            {getUniqueTypes().map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Enter city..."
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label>Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn">Filters Applied</button>
        {hasFilters && (
          <button className="btn" style={{ background: '#f56565' }} onClick={() => setFilters({ type: '', location: '', date: '' })}>
            Clear Filters
          </button>
        )}
      </div>
    </section>
  );
};

export default Filters;
