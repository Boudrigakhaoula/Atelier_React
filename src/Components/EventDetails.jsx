import React from 'react';
import { useParams } from 'react-router-dom';
import eventsData from '../events.json'; // Importer les données des événements

const EventDetails = () => {
  const { eventName } = useParams(); // Récupérer le nom de l'événement depuis l'URL
  const event = eventsData.find((event) => event.name === eventName); // Trouver l'événement correspondant

  if (!event) {
    return <div>Event not found!</div>;
  }

  return (
    <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>

      <img 
        src={event.img} 
     
        style={{ width: '300px', borderRadius: '10px' }} 
      />

      
      <div>
        <h1>{event.name}</h1>
        <h2>Description</h2>
        <p>{event.description}</p>
        <h2>Price</h2>
        <p>{event.price} Dt</p>
      </div>
    </div>
  );
};

export default EventDetails;
