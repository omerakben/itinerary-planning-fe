import { clientCredentials } from '@/utils/client';

const endpoint = clientCredentials.databaseURL;

// Get all trips in database
const getTrips = () => 
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/trips`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// Get single trip by trip id
const getSingleTrip = (id) =>
  new Promise ((resolve, reject) => {
    fetch(`${endpoint}/trips/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data))
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// Create a trip with a JSON object payload
const createTrip = (payload) => 
  new Promise ((resolve, reject) => {
    fetch(`${endpoint}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  })

// Edit a trip
const updateTrip = (payload) => 
  new Promise ((resolve, reject) => {
    fetch(`${endpoint}/trips/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// Delete a trip by trip id
const deleteTrip = (id) => 
  new Promise ((resolve, reject) => {
    fetch(`${endpoint}/trips/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { 
  getTrips,
  getSingleTrip,
  createTrip,
  deleteTrip,
  updateTrip,
};
