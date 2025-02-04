'use client';

// External imports should come first
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Internal imports
import { getTrips } from '../../api/tripsData';
import Loading from '../../components/Loading';
import TripCard from '../../components/TripCard';
import { useAuth } from '../../utils/context/authContext';

// Main page component for displaying user's itineraries
export default function MyItineraries() {
  const { user, loading } = useAuth();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load trips when user is authenticated
  const loadTrips = async () => {
    try {
      if (user?.uid) {
        const tripsData = await getTrips();
        setTrips(tripsData);
      } else {
        setTrips([]);
      }
    } catch (error) {
      console.error('Error loading trips:', error);
      setTrips([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      loadTrips();
    }
  }, [user, loading]);

  // Function to handle trip updates (including deletion)
  const handleTripUpdate = () => {
    loadTrips(); // Reload the trips list
  };

  // Show loading spinner while authentication or data is loading
  if (loading || isLoading) {
    return <Loading />;
  }

  // Redirect to home if not authenticated
  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/20">
          <h1 className="text-2xl font-bold text-gray-900">My Itineraries</h1>
          <button type="button" onClick={() => router.push('/trips/new')} className="create-final-button">
            Create New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 text-center shadow-lg border border-white/20">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No Itineraries Yet</h2>
            <p className="text-gray-600 mb-6">Start planning your next adventure by creating a new trip!</p>
            <button type="button" onClick={() => router.push('/trips/new')} className="create-final-button">
              Plan Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onView={() => router.push(`/trips/${trip.id}`)} onUpdate={handleTripUpdate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
