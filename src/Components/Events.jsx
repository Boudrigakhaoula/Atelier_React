import React, { useState, useEffect } from 'react';
import { Alert, Row, Col } from 'react-bootstrap';
import Event from './Event';
import eventsData from '../events.json';

const Events = () => {
  const [events, setEvents] = useState(eventsData);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
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
            <Event event={event} onBook={handleBook} onLike={handleLike} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Events;