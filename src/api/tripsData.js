import { clientCredentials } from '@/utils/client';

const endpoint = clientCredentials.databaseURL;
console.log(endpoint);
// const getTrips = (uid) => 
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/trips.json?orderBy="uid"&equalTo="${uid}"`)
//   })
