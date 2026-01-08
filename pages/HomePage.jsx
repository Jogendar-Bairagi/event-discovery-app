import React, { useState, useEffect } from 'react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import Filters from '../components/Filters';
// Remove Pagination import - we build it here

const HomePage = () => {
  const { allEvents, filters, setFilters, applyFilters, clearFilters, loading } = useEvents();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.type, filters.location, filters.date]);

  // Filter events based on current filters
  const filteredEvents = allEvents.filter(event => {
    if (filters.type && event.type !== filters.type) return false;
    if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.date && event.date !== filters.date) return false;
    return true;
  });

  // Pagination math
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div>
      <Filters />
      
      {/* Events Grid */}
      <section className="events-grid">
        {currentEvents.length === 0 ? (
          <div className="no-events">
            <h3>😔 No events found</h3>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          currentEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </section>
      
      {/* Inline Pagination */}
      {filteredEvents.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + eventsPerPage, filteredEvents.length)} 
            of {filteredEvents.length} events (Page {currentPage} of {totalPages})
          </div>
          
          <div className="pagination-buttons">
            <button 
              className="btn" 
              onClick={() => goToPage(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}
              {totalPages > 5 && (
                <>
                  <span style={{ padding: '0.5rem 0.3rem' }}>...</span>
                  <button 
                    className="page-btn" 
                    onClick={() => goToPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button 
              className="btn" 
              onClick={() => goToPage(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
