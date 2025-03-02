import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './Components/Navbar';
import './App.css';
import AddEvent from './Components/AddEvent';
import UpdateEvent from './Components/UpdateEvent';
import EventDetails from './Components/EventDetails'; // Gardez cette ligne
const Events = lazy(() => import('./Components/Events'));
const NotFound = lazy(() => import('./Components/NotFound'));

const App = () => {
    return (
        <div className="App">
            <NavigationBar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/events" />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetails />} /> {/* Utilisez l'ID ici */}
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/update-event/:id" element={<UpdateEvent />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;