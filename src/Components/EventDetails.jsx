import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../services/api';

const EventDetails = () => {
    const { id } = useParams(); // Récupérer l'ID de l'événement depuis l'URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const foundEvent = await fetchEventById(id); // Utiliser fetchEventById pour récupérer l'événement
                setEvent(foundEvent);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEvent();
    }, [id]);

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
