import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './Components/Navbar';
import './App.css';

// Chargement paresseux des composants
const Events = lazy(() => import('./Components/Events'));
const EventDetails = lazy(() => import('./Components/EventDetails'));
const NotFound = lazy(() => import('./Components/NotFound'));


const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/events" />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventName" element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;