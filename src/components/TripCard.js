'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTrip } from '@/api/tripsData';

export default function TripCard({ tripObj, onUpdate }) {
  const deleteThisTrip = () => {
    if (window.confirm('Delete this trip?')) {
      deleteTrip(tripObj.id).then(() => onUpdate());
    }
  };

  
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title><h1>{tripObj.destination}</h1></Card.Title>
        <Card.Text>
          <p>{tripObj.start_date} to {tripObj.end_date}</p>
          <p>{tripObj.number_of_travelers} travelers</p>
          <p>Mode of travel: {tripObj.mode_of_travel.type_of_travel}</p>
        </Card.Text>
      </Card.Body>
      <Link href={`/trips/${tripObj.id}`} passHref>
        <Button variant="primary">View</Button>
      </Link>
      <Button variant="danger" onClick={deleteThisTrip}>Delete</Button>
    </Card>
  )
}

TripCard.propTypes = {
  tripObj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.number,
    destination: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    mode_of_travel: PropTypes.number,
    number_of_travelers: PropTypes.number,
    people_on_trip: PropTypes.string,
    notes: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
