'use client';

// External imports should come first
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Internal imports
import { getTrips } from '../../api/tripsData';
import { PlusIcon } from '../../components/Icons';
import Loading from '../../components/Loading';
import TripCard from '../../components/TripCard';
import { useAuth } from '../../utils/context/authContext';

// Main page component for displaying user's itineraries
export default function MyItineraries() {
  const { user, loading } = useAuth();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to filter trips based on search term
  const filterTrips = (tripsData, searchTerm) => {
    if (!searchTerm) return tripsData;

    const search = searchTerm.toLowerCase();
    return tripsData.filter((trip) => trip.destination.toLowerCase().includes(search) || trip.people_on_trip?.toLowerCase().includes(search) || trip.notes?.toLowerCase().includes(search) || trip.mode_of_travel?.type_of_travel.toLowerCase().includes(search));
  };

  // Load trips when user is authenticated
  const loadTrips = async () => {
    try {
      if (user?.uid) {
        const tripsData = await getTrips();
        setTrips(tripsData);

        // Get search term from URL
        const currentSearchTerm = searchParams.get('search');
        setFilteredTrips(filterTrips(tripsData, currentSearchTerm));
      } else {
        setTrips([]);
        setFilteredTrips([]);
      }
    } catch (error) {
      console.error('Error loading trips:', error);
      setTrips([]);
      setFilteredTrips([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load of trips
  useEffect(() => {
    if (!loading) {
      loadTrips();
    }
  }, [user, loading]);

  // Update filtered trips when search parameter changes
  useEffect(() => {
    const currentSearchTerm = searchParams.get('search');
    setFilteredTrips(filterTrips(trips, currentSearchTerm));
  }, [searchParams, trips]);

  const handleClearSearch = () => {
    router.push('/trips');
    window.history.replaceState({}, '', '/trips');
    setFilteredTrips(trips);
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

  const currentSearchTerm = searchParams.get('search');

  return (
    <div className="min-h-screen p-32">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/20">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Itineraries</h1>
            {currentSearchTerm && (
              <p className="text-sm text-gray-600 mt-1">
                Search results for: &quot;{currentSearchTerm}&quot;
                <button type="button" onClick={handleClearSearch} className="ml-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md px-2 py-1">
                  Clear search
                </button>
              </p>
            )}
          </div>
          <button type="button" onClick={() => router.push('/trips/new')} className="create-final-button">
            <PlusIcon className="w-5 h-5 inline-block mr-2" />
            Create Trip
          </button>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-12 text-center shadow-lg border border-white/20">
            {currentSearchTerm ? (
              <div className="flex flex-col items-center justify-center">
                <Image src="/logo.png" alt="No Results" width={80} height={80} className="mb-4 opacity-80" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Matching Itineraries Found</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">Try adjusting your search terms or start planning a new adventure!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image src="/logo.png" alt="Start Planning" width={80} height={80} className="mb-4 opacity-80" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Itineraries Yet</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">Your journey begins here! Start planning your next adventure by creating a new trip.</p>
                <button type="button" onClick={() => router.push('/trips/new')} className="neon-button flex items-center space-x-2">
                  <PlusIcon className="w-5 h-5" />
                  <span>Create Your First Trip</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onView={() => router.push(`/trips/${trip.id}`)} onUpdate={loadTrips} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
