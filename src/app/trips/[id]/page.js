'use client';

import { getSingleTrip } from '@/api/tripsData';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function ViewTrip({ params }) {
  const [tripDetails, setTripDetails] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTrip(id).then(setTripDetails);
  }, [id]);

  return (
    <div className="min-h-screen p-32">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your trip to {tripDetails.destination}</h1>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Dates</p>
              <p className="text-lg text-gray-900">
                From: {tripDetails.start_date} Until: {tripDetails.end_date}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Travel Mode</p>
              <p className="text-lg text-gray-900">{tripDetails.mode_of_travel?.type_of_travel || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Travelers</p>
              <p className="text-lg text-gray-900">
                {tripDetails.number_of_travelers} travelers: {tripDetails.people_on_trip}
              </p>
            </div>
            {tripDetails.notes && (
              <div>
                <p className="text-sm text-gray-600">Notes</p>
                <p className="text-lg text-gray-900">{tripDetails.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ViewTrip.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
