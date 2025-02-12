'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getSingleTrip } from '../../../../api/tripsData';
import TripForm from '../../../../components/forms/TripForm';

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
