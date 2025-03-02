import axios from "axios";

const url = "http://localhost:3001/events";
// for get
export const getallEvents = async () => {
    const response = await axios.get(url);
    return response.data;
};
// get by  ID
export const fetchEventById = async (id) => {
    const response = await axios.get(`${url}/${id}`);
    return response.data; 
  };
// for add
// export const addEvent = async (event) => {
//     const response = await axios.post(url, event);
//     return response.data;
// };
export const addEvent = async (event) => {
    return await axios.post(url, event, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
// // for update 
export const editEvent = async (id, event) => {
    try {
        const response = await axios.put(`${url}/${id}`, event, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Response from API:', response.data); // Afficher la réponse de l'API
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error.response ? error.response.data : error.message); // Afficher l'erreur
        throw error;
    }
};
// export const editEvent = async (id, event) => {
//     const response = await axios.put(`${url}/${id}`, event); 
//     return response.data;
// };
// for delete
export const deleteEvent = async (id) => {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
};