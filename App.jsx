import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import HomePage from './pages/HomePage';
import EventDetail from './pages/EventDetail';
import './App.css';

function AppContent() {
  return (
    <div className="App">
      <header className="app-header">
        <h1> Local Events</h1>
        <p>Discover & Join Community Events Near You</p>
      </header>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <EventProvider>
      <Router>
        <AppContent />
      </Router>
    </EventProvider>
  );
}

export default App;
