import { clientCredentials } from '@/utils/client';

const endpoint = clientCredentials.databaseURL;

// Get single user
const getUser = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${id}`, {
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

  export default getUser;
