import { clientCredentials } from '@/utils/client';

const endpoint = clientCredentials.databaseURL;

// Get all trips
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

// Get single trip
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

export { getTrips, getSingleTrip };
