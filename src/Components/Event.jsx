import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { getallEvents, addEvent, editEvent, deleteEvent} from '../services/api';

const Event = ({ event, onBook, onLike, onDelete }) => {
  const [liked, setLiked] = useState(event.like);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); 

  const handleLike = () => {
    setLiked(!liked);
    onLike(event.name);
  };

  // const handleEventClick = () => {
  //   navigate(`/events/${event.name}`); 
  // };
  const handleEventClick = () => {
    navigate(`/events/${event.id}`); // Utiliser l'ID pour la navigation
};

  const handleDeleteEvent = () => {
    onDelete(event.id); 
};
  const imageSrc = event.nbTickets === 0 ? '/public/soldout.png' : event.img;

  return (
    <Card  style={{ width: '18rem', margin: '10px' }}>
      <Card.Img onClick={handleEventClick} variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title onClick={handleEventClick} style={{ cursor: 'pointer' }}>
          {event.name}
        </Card.Title>
        <Card.Text>Price: {event.price}</Card.Text>
        <Card.Text>Number of tickets: {event.nbTickets}</Card.Text>
        <Card.Text>Number of participants: {event.nbParticipants}</Card.Text>
        <Card.Text>Like: {liked ? 'Yes' : 'No'}</Card.Text>
        <Button
          variant="primary"
          onClick={() => onBook(event.name)}
          disabled={event.nbTickets === 0}
        >
          {event.nbTickets === 0 ? 'Sold Out' : 'Book an event'}
        </Button>
        <Button
          variant={liked ? 'danger' : 'outline-danger'}
          onClick={handleLike}
          style={{ marginLeft: '10px' }}
        >
          {liked ? 'Dislike' : 'Like'}
        </Button>
        <Button variant="success" onClick={() => navigate(`/update-event/${event.id}`)}>
          Update 
        </Button>
        <Button variant="danger" onClick={handleDeleteEvent}>
          Delete 
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Event;