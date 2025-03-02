import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEvent } from '../services/api';
import { eventSchema } from '../schemas/eventschemas'; // Importer le schéma de validation

const AddEvent = () => {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    img: '', // Stocker l'URL de l'image au lieu du fichier
  });
  const [errors, setErrors] = useState({});

  // Gérer les changements dans les champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convertir les valeurs en nombres si le champ est price, nbTickets ou nbParticipants
    const newValue = (name === 'price' || name === 'nbTickets' || name === 'nbParticipants') ? Number(value) : value;
    setNewEvent({ ...newEvent, [name]: newValue });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Valider les données avec Zod
      await eventSchema.parseAsync(newEvent);

      // Envoyer les données au format JSON
      await addEvent(newEvent);
      navigate('/events'); // Rediriger vers la page des événements
    } catch (error) {
      if (error.name === 'ZodError') {
        // Gestion des erreurs de validation
        const validationErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message; // Associer le message d'erreur au champ correspondant
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        // Gestion des erreurs API
        alert("Erreur lors de l'ajout de l'événement : " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 className="mb-4">Add Event</h2>
      {errors.form && <div className="alert alert-danger">{errors.form}</div>}

      <div className="mb-3">
        <label htmlFor="eventName" className="form-label">Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="eventName"
          name="name"
          value={newEvent.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="eventDescription" className="form-label">Description</label>
        <input
          type="text"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          id="eventDescription"
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          required
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="eventPrice" className="form-label">Price</label>
        <input
          type="number"
          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
          id="eventPrice"
          name="price"
          value={newEvent.price}
          onChange={handleInputChange}
          required
        />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="eventNbTickets" className="form-label">Number of Tickets</label>
        <input
          type="number"
          className={`form-control ${errors.nbTickets ? 'is-invalid' : ''}`}
          id="eventNbTickets"
          name="nbTickets"
          value={newEvent.nbTickets}
          onChange={handleInputChange}
          required
        />
        {errors.nbTickets && <div className="invalid-feedback">{errors.nbTickets}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="eventnbParticipants" className="form-label">Number of Participants</label>
        <input
          type="number"
          className={`form-control ${errors.nbParticipants ? 'is-invalid' : ''}`}
          id="eventnbParticipants"
          name="nbParticipants"
          value={newEvent.nbParticipants}
          onChange={handleInputChange}
          required
        />
        {errors.nbParticipants && <div className="invalid-feedback">{errors.nbParticipants}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="eventImg" className="form-label">Image URL</label>
        <input
          type="text"
          className={`form-control ${errors.img ? 'is-invalid' : ''}`}
          id="eventImg"
          name="img"
          value={newEvent.img}
          onChange={handleInputChange}
        />
        {errors.img && <div className="invalid-feedback">{errors.img}</div>}
      </div>

      <button type="submit" className="btn btn-primary">Add an Event</button>
      <button type="reset" className="btn btn-secondary" style={{ marginLeft: '10px' }}>Cancel</button>
    </form>
  );
};

export default AddEvent;