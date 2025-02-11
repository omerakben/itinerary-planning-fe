'use client';

// External packages first
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Internal imports
import { getTrips } from '../api/tripsData';
import { PlusIcon } from '../components/Icons';
import Loading from '../components/Loading';
import ProfileSetup from '../components/ProfileSetup';
import SignIn from '../components/SignIn';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user, loading } = useAuth();
  const [trips, setTrips] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadTrips() {
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
      }
    }

    if (!loading) {
      loadTrips();
    }
  }, [user, loading]);

  // If not authenticated and not loading, show sign in
  if (!loading && !user) {
    return <SignIn />;
  }

  // Show loading spinner only during initial auth check
  if (loading) {
    return <Loading />;
  }

  // If authenticated but no profile, show profile setup
  if (!user.profile) {
    return <ProfileSetup user={user} onComplete={() => window.location.reload()} />;
  }

  // Calculate quick stats
  const upcomingTrips = trips.filter((trip) => {
    const startDate = new Date(trip.start_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return startDate >= today;
  }).length;

  const handleCreateTrip = () => {
    router.push('/trips/new');
  };

  // Function to get travel mode display text
  const getTravelModeDisplay = (mode) => {
    if (!mode) return 'Not specified';
    return mode.type_of_travel || 'Not specified';
  };

  // Main app content
  return (
    <div className="min-h-screen p-32">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/20">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.profile?.name || user.displayName}!</h1>
          <button type="button" onClick={handleCreateTrip} className="create-final-button">
            <PlusIcon className="w-5 h-5 inline-block mr-2" />
            Create Trip
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trips</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{trips.length}</h3>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Trips</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{upcomingTrips}</h3>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Trips</h2>
            {trips.length > 3 && (
              <button type="button" onClick={() => router.push('/trips')} className="text-blue-600 hover:text-blue-700 font-medium">
                View all
              </button>
            )}
          </div>

          {trips.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No trips</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new trip.</p>
              <div className="mt-6">
                <button type="button" onClick={handleCreateTrip} className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create Trip
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.slice(0, 3).map((trip) => (
                <button key={trip.id} type="button" onClick={() => router.push(`/trips/${trip.id}`)} className="text-left relative bg-white/70 backdrop-blur-md rounded-lg p-6 hover:shadow-xl transition-all w-full hover:bg-white/80 border border-white/20">
                  <div className="mb-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{trip.destination}</h3>
                      <Image src="/svg/card-location.svg" alt="Location" width={24} height={24} className="text-gray-500" />
                    </div>
                  </div>

                  <div className="space-y-3 text-gray-600">
                    {/* Dates with calendar icon */}
                    <div className="flex items-center space-x-2">
                      <Image src="/svg/card-calendar.svg" alt="Calendar" width={20} height={20} />
                      <span>{new Date(trip.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>

                    {/* Travel Mode */}
                    <div className="flex items-center space-x-2">
                      <Image src="/svg/card-travel-mode.svg" alt="Travel Mode" width={20} height={20} />
                      <span>{getTravelModeDisplay(trip.mode_of_travel)}</span>
                    </div>

                    {/* Travelers */}
                    <div className="flex items-center space-x-2">
                      <Image src="/svg/card-travelers.svg" alt="Travelers" width={20} height={20} />
                      <span>{trip.number_of_travelers} travelers</span>
                    </div>

                    {/* Notes */}
                    {trip.notes && (
                      <div className="flex items-start space-x-2">
                        <Image src="/svg/card-notes.svg" alt="Notes" width={20} height={20} className="mt-1" />
                        <p className="text-sm line-clamp-2">{trip.notes}</p>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
