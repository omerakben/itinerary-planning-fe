import { clientCredentials } from '@/utils/client';

const endpoint = clientCredentials.databaseURL;

// Get all trips by user
const getTrips = (uid) => 
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/trips?orderBy="uid"&equalTo="${uid}"`, {
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

export default getTrips;
