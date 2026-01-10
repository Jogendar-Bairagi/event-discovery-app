# 🌟 Local Events Discovery Web-App

**Frontend Developer Intern Assignment - StarLabs**

A **React-based platform** for discovering and joining local community events featuring **pagination**, **real-time filtering**, and **RSVP functionality**.

## ✨ Features

- ✅ **20+ Events** - Workshops, Music, Sports, Meetups across India
- ✅ **Pagination** - 8 events per page with page navigation
- ✅ **Real-time Filters** - Type, Location, Date filtering
- ✅ **Event Details Page** - Complete info + RSVP button
- ✅ **RSVP System** - Confirmation messages after joining
- ✅ **Mobile-first Responsive** - Works perfectly on all devices
- ✅ **Context API** - Professional state management

## 🛠 Tech Stack

React 18+
Context API
React Router 
Plain CSS 

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/event-discovery-app.git
cd event-discovery-app
```
2.Install dependencies
```
npm install
```
3.Start the development server
```
npm start
```
4.Open your browser
```
http://localhost:3000
```
📂 Project Structure
src/
├── context/
│   └── EventContext.js     # State management (Context API)
├── components/
│   ├── EventCard.js        # Event cards
│   └── Filters.js          # Filter controls
├── pages/
│   ├── HomePage.js         # Events list + pagination
│   └── EventDetail.js      # Single event view
├── App.js                  # Main app + routing
└── App.css                 # All styles (plain CSS)

public/
└── index.html              # Entry point
