'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { getTrips } from '@/api/tripsData';

function Home() {
  const { user } = useAuth();

  // Set state for trips to display
  const [trips, setTrips] = useState([]);

  // Get all trips
  const getAllTrips = () => {
    getTrips().then(setTrips);
  };

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hello {user.displayName}! </h1>
      <p className="mb-4">Click the button below to logout!</p>
      <button type="button" onClick={signOut} className="px-6 py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
        Sign Out
      </button>
      {/* TODO: use a trip card to display these */}
      {trips.map((trip) => (
        <div key={trip.id} className="mt-4">
          <h2 className="text-xl font-semibold">{trip.destination}</h2>
          <p>{trip.mode_of_travel}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
