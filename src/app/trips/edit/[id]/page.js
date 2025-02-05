'use client';

import React, { useEffect, useState } from 'react';
import { getSingleTrip } from '@/api/tripsData';
import TripForm from '@/components/forms/TripForm';
import PropTypes from 'prop-types';

export default function EditTrip({ params }) {
  const [editItem, setEditItem] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTrip(id).then(setEditItem);
  }, [id]);

  return <TripForm obj={editItem} />;
}

EditTrip.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
