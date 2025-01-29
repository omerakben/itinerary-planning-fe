'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { getTrips } from '@/api/tripsData';
import TripCard from '@/components/TripCard';

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
      <p className="mb-4">You have {trips.length} trips coming up: </p>
      {trips.map((trip) => (
        <TripCard key={trip.id} tripObj={trip} onUpdate={getAllTrips} />
      ))}
    </div>
  );
}

export default Home;
