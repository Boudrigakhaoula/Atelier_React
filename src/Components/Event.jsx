import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Event = ({ event, onBook, onLike }) => {
  const [liked, setLiked] = useState(event.like);

  const handleLike = () => {
    setLiked(!liked);
    onLike(event.name);
  };

  // Déterminer l'image à afficher
  const imageSrc = event.nbTickets === 0 ? '/public/soldout.png' : event.img;

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>Price: {event.price}</Card.Text>
        <Card.Text>Number of tickets : {event.nbTickets}</Card.Text>
        <Card.Text>Number of participants: {event.nbParticipants}</Card.Text>
       
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
      </Card.Body>
    </Card>
  );
};

export default Event;