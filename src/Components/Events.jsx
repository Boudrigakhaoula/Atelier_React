import React, { useState, useEffect } from 'react';
import { Alert, Row, Col } from 'react-bootstrap';
import Event from './Event';
import { getallEvents, deleteEvent } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
      const fetchEvents = async () => {
          const data = await getallEvents();
          setEvents(data);
      };
      fetchEvents();
  }, []);


  const handleBook = (eventName) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.name === eventName
          ? {
              ...event,
              nbParticipants: event.nbParticipants + 1,
              nbTickets: event.nbTickets - 1,
            }
          : event
      )
    );
    alert('You have booked an event');
  };

  const handleLike = (eventName) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.name === eventName
          ? { ...event, like: !event.like }
          : event
      )
    );
  };
  const handleDeleteEvent = async (id) => {
    try {
        await deleteEvent(id); // Appel à l'API pour supprimer l'événement
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== id)); // Mettre à jour l'état
    } catch (error) {
        console.error("Error deleting event:", error);
    }
};
  return (
    <div>
      {showWelcome && (
        <Alert variant="success" onClose={() => setShowWelcome(false)} dismissible>
          Welcome to ESPRIT Event Management System!
        </Alert>
      )}
      <Row>
        {events.map((event) => (
          <Col key={event.name} md={4}>
            <Event event={event} onBook={handleBook} onLike={handleLike} onDelete={handleDeleteEvent}/>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Events;