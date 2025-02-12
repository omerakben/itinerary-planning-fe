import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get all locations
const getLocations = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations`, {
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

// Get single location
const getSingleLocation = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations/${id}`, {
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
export { getLocations, getSingleLocation };
