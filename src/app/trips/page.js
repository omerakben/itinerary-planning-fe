'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getTrips } from '../../api/tripsData';
import { PlusIcon, SearchIcon } from '../../components/Icons';
import Loading from '../../components/Loading';
import TripCard from '../../components/TripCard';
import { useAuth } from '../../utils/context/authContext';

// Function to filter trips based on search term
const filterTrips = (tripsData, searchTerm) => {
  if (!searchTerm) return tripsData;

  const search = searchTerm.toLowerCase();
  return tripsData.filter((trip) => trip.destination.toLowerCase().includes(search) || trip.people_on_trip?.toLowerCase().includes(search) || trip.notes?.toLowerCase().includes(search) || trip.mode_of_travel?.type_of_travel.toLowerCase().includes(search));
};

// Main page component for displaying user's itineraries
export default function MyItineraries() {
  const { user, loading } = useAuth();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClearSearch = () => {
    setSearchInput('');
    router.push('/trips');
    window.history.replaceState({}, '', '/trips');
    setFilteredTrips(trips);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/trips?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      handleClearSearch();
    }
  };

  const loadTrips = useCallback(async () => {
    try {
      if (user?.uid) {
        const tripsData = await getTrips();
        setTrips(tripsData);
        const currentSearchTerm = searchParams.get('search');
        setFilteredTrips(filterTrips(tripsData, currentSearchTerm));
        setSearchInput(currentSearchTerm || '');
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
  }, [user, searchParams]);

  useEffect(() => {
    if (!loading) {
      loadTrips();
    }
  }, [loading, loadTrips]);

  // Update filtered trips when search parameter changes
  useEffect(() => {
    const currentSearchTerm = searchParams.get('search');
    setFilteredTrips(filterTrips(trips, currentSearchTerm));
  }, [searchParams, trips]);

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
    <div className="min-h-screen p-8 md:p-16 lg:p-32 transition-all">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/60 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-white/20">
          <div className="w-full md:w-auto">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">My Itineraries</h1>
            {currentSearchTerm && (
              <p className="text-sm text-gray-600 mt-1 text-center md:text-left">
                Search results for: &quot;{currentSearchTerm}&quot;
                <button type="button" onClick={handleClearSearch} className="ml-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md px-2 py-1 hover:bg-blue-50 transition-colors">
                  Clear search
                </button>
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <form onSubmit={handleSearch} className="flex-grow">
              <div className="relative">
                <input type="search" placeholder="Search trips..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full px-4 py-2 pr-10 text-gray-900 bg-white/50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors" aria-label="Search">
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>
            </form>

            <button type="button" onClick={() => router.push('/trips/new')} className="create-final-button whitespace-nowrap flex-shrink-0 w-full sm:w-auto">
              <PlusIcon className="w-5 h-5 inline-block mr-2" />
              Create Trip
            </button>
          </div>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 md:p-12 text-center shadow-lg border border-white/20">
            {currentSearchTerm ? (
              <div className="flex flex-col items-center justify-center">
                <Image src="/logo.png" alt="No Results" width={80} height={80} className="mb-4 opacity-80" priority />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">No Matching Itineraries Found</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">Try adjusting your search terms or start planning a new adventure!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image src="/logo.png" alt="Start Planning" width={80} height={80} className="mb-4 opacity-80" priority />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">No Itineraries Yet</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">Your journey begins here! Start planning your next adventure by creating a new trip.</p>
                <button type="button" onClick={() => router.push('/trips/new')} className="neon-button flex items-center space-x-2 w-full sm:w-auto justify-center">
                  <PlusIcon className="w-5 h-5" />
                  <span>Create Your First Trip</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onView={() => router.push(`/trips/${trip.id}`)} onUpdate={loadTrips} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
