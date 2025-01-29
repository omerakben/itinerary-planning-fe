'use client';

import React, { useEffect, useState } from 'react'
import { getSingleTrip } from '@/api/tripsData';
import PropTypes from 'prop-types'

export default function ViewTrip({ params }) {
  const [tripDetails, setTripDetails] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTrip(id).then(setTripDetails);
  }, [id]);

  console.warn('tripDetails', tripDetails);
  return (
    <div>
      <h1>{tripDetails.destination}hee</h1>
    </div>
  )
}

ViewTrip.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
