'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteTrip } from '@/api/tripsData';

export default function TripCard({ tripObj, onUpdate }) {
  const deleteThisTrip = () => {
    if (window.confirm('Delete this trip?')) {
      deleteTrip(tripObj.id).then(() => onUpdate());
    }
  };

  
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Button variant="danger" onClick={deleteThisTrip}>Delete</Button>
    </Card>
  )
}

TripCard.propTypes = {
  tripObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    user_id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
