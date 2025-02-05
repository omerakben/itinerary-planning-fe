'use client';

import React, { useEffect, useState } from 'react';
import { getSingleTrip } from '@/api/tripsData';
import PropTypes from 'prop-types';

export default function ViewTrip({ params }) {
  const [tripDetails, setTripDetails] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTrip(id).then(setTripDetails);
  }, [id]);

  return (
    <div>
      {/* The ? checks if the user exists before attempting to get the bio, to return undefined instead of an error; ex: tripDetails.user?.bio */}
      <h1>Your trip to {tripDetails.destination}:</h1>
      <h1>From: {tripDetails.start_date}</h1>
      <h1>Until: {tripDetails.end_date}</h1>
      <h1>{tripDetails.mode_of_travel?.type_of_travel}</h1>
      <h1>
        {tripDetails.number_of_travelers} travelers: {tripDetails.people_on_trip}
      </h1>
      <h1>{tripDetails.notes}</h1>
    </div>
  );
}

ViewTrip.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
