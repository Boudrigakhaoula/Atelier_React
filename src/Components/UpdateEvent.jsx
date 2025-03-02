import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEventById, editEvent } from '../services/api';
import { eventSchema } from '../schemas/eventschemas';
import { Alert } from 'react-bootstrap';

const UpdateEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        price: 0,
        nbTickets: 0,
        img: '', // Champ facultatif
    });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await fetchEventById(id);
                setEventData(event);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEvent();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = (name === 'price' || name === 'nbTickets') ? Number(value) : value;
        setEventData({ ...eventData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Valider les données avec zod
            await eventSchema.parseAsync(eventData);

            // Envoyer les données à l'API
            await editEvent(id, eventData);
            setAlert({ type: 'success', message: 'Event updated successfully!' });
            setTimeout(() => navigate('/events'), 2000);
        } catch (error) {
            if (error.name === 'ZodError') {
                // Gestion des erreurs de validation
                const validationErrors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(validationErrors);
            } else {
                // Gestion des erreurs API
                console.error('API Error:', error);
                setAlert({ type: 'danger', message: 'Error updating event. Please try again later.' });
            }
        }
    };

    const handleCancel = () => {
        navigate('/events');
    };

    return (
        <div>
            {alert && (
                <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                    {alert.message}
                </Alert>
            )}
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">Event Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="eventName"
                        name="name"
                        value={eventData.name}
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
                        value={eventData.description}
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
                        value={eventData.price}
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
                        value={eventData.nbTickets}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.nbTickets && <div className="invalid-feedback">{errors.nbTickets}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="eventImg" className="form-label">Image URL (Optional)</label>
                    <input
                        type="text"
                        className={`form-control ${errors.img ? 'is-invalid' : ''}`}
                        id="eventImg"
                        name="img"
                        value={eventData.img}
                        onChange={handleInputChange}
                    />
                    {errors.img && <div className="invalid-feedback">{errors.img}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Update Event</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateEvent;