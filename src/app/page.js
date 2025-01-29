'use client';

import { getTrips } from '@/api/tripsData';
import ProfileSetup from '@/components/ProfileSetup';
import SignIn from '@/components/SignIn';
import { signOut } from '@/utils/auth';
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';

function Home() {
  const { user, loading } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (user && user.profile) {
      getTrips().then(setTrips);
    }
  }, [user]);

  // If not authenticated, show sign in page immediately
  if (!user) {
    return <SignIn />;
  }

  // Show loading spinner only when checking for profile or fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  // If authenticated but no profile, show profile setup
  if (!user.profile) {
    return <ProfileSetup user={user} onComplete={() => window.location.reload()} />;
  }

  // Main app content
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hello {user.profile?.name || user.displayName}!</h1>
      <p className="mb-4">Click the button below to logout!</p>
      <button type="button" onClick={signOut} className="px-6 py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
        Sign Out
      </button>

      {trips.length > 0 ? (
        trips.map((trip) => (
          <div key={trip.id} className="mt-4">
            <h2 className="text-xl font-semibold">{trip.destination}</h2>
            <p>{trip.mode_of_travel}</p>
          </div>
        ))
      ) : (
        <p className="mt-8 text-gray-600">No trips yet. Start planning your first adventure!</p>
      )}
    </div>
  );
}

export default Home;
