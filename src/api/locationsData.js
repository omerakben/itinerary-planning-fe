import { clientCredentials } from '@/utils/client';

const endpoint = clientCredentials.databaseURL;

// Get all locations by user
const getLocations = (uid) => 
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations?orderBy="uid"&equalTo="${uid}"`, {
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

export default getLocations;
