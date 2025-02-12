'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { getSingleTrip } from '../../../api/tripsData';
import { CarIcon, LandingIcon, LocationIcon, NotesIcon, PlaneIcon, SuitcaseIcon, TakeoffIcon, TrainIcon, TravelersIcon, WalkingIcon } from '../../../components/Icons';

export default function ViewTrip({ params }) {
  const [tripDetails, setTripDetails] = useState({});
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    getSingleTrip(id).then(setTripDetails);
  }, [id]);

  const travelModeIcon = (mode) => {
    switch (mode?.toLowerCase()) {
      case 'car':
        return <CarIcon className="w-5 h-5" />;
      case 'plane':
        return <PlaneIcon className="w-5 h-5" />;
      case 'train':
        return <TrainIcon className="w-5 h-5" />;
      case 'walking':
        return <WalkingIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-32">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="flex items-center text-2xl font-semibold text-gray-900">
              <SuitcaseIcon className="w-6 h-6 mr-2 text-gray-700" />
              {tripDetails.destination}
            </h3>
            <button type="button" onClick={() => router.push(`/trips/edit/${tripDetails.id}`)} className="neon-button">
              Edit Trip
            </button>
          </div>

          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center text-sm font-medium text-gray-900">
                  <TakeoffIcon className="w-5 h-5 mr-2 text-gray-700" />
                  Arriving
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{new Date(tripDetails.start_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center text-sm font-medium text-gray-900">
                  <LandingIcon className="w-5 h-5 mr-2 text-gray-700" />
                  Returning
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{new Date(tripDetails.end_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center text-sm font-medium text-gray-900">
                  <LocationIcon className="w-5 h-5 mr-2 text-gray-700" />
                  Via
                </dt>
                <dd className="flex items-center mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {travelModeIcon(tripDetails.mode_of_travel?.type_of_travel)}
                  <span className="ml-2">{tripDetails.mode_of_travel?.type_of_travel}</span>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center text-sm font-medium text-gray-900">
                  <TravelersIcon className="w-5 h-5 mr-2 text-gray-700" />
                  Travelers
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {tripDetails.number_of_travelers} travelers: {tripDetails.people_on_trip}
                </dd>
              </div>

              {tripDetails.notes && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex items-center text-sm font-medium text-gray-900">
                    <NotesIcon className="w-5 h-5 mr-2 text-gray-700" />
                    Notes
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{tripDetails.notes}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

ViewTrip.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
