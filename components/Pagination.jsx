import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';

const Pagination = () => {
  const { allEvents, filters } = useEvents();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  // Filter events locally (no context changes)
  const filteredEvents = allEvents.filter(event => {
    if (filters.type && event.type !== filters.type) return false;
    if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.date && event.date !== filters.date) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  // Update HomePage to use these events (via props or context)
  const goToPage = (page) => setCurrentPage(page > 0 ? page : 1);

  if (filteredEvents.length === 0) return null;

  return (
    <div className="pagination-container">
      <div>Page {currentPage} of {totalPages}</div>
      <div>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
