'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { deleteTrip } from '../api/tripsData';

// Component for displaying individual trip information in a card format
export default function TripCard({ trip, onView, onUpdate }) {
  const router = useRouter();

  // Format dates from the backend (stored as YYYY-MM-DD)

  const deleteThisTrip = async () => {
    if (window.confirm('Delete this trip?')) {
      try {
        await deleteTrip(trip.id);
        onUpdate(); // Update parent state instead of navigating
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-card-foreground">{trip.destination}</h3>
      </div>
      <div className="text-muted-foreground space-y-2">
        <p>
          <span className="font-medium">Dates:</span> {trip.start_date} - {trip.end_date}
        </p>
        <p>
          <span className="font-medium">Travel Mode:</span> {trip.mode_of_travel?.type_of_travel || 'Not specified'}
        </p>
        <p>
          <span className="font-medium">Travelers:</span> {trip.number_of_travelers}
        </p>
        {trip.notes && (
          <p>
            <span className="font-medium">Notes:</span> {trip.notes}
          </p>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Link href={`/trips/${trip.id}`} onClick={onView} className="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors duration-200">
          View Details
        </Link>
        <div className="flex space-x-2">
          <button type="button" onClick={() => router.push(`/trips/edit/${trip.id}`)} className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded hover:bg-secondary/20 transition-colors duration-200">
            Edit
          </button>
          <button type="button" onClick={deleteThisTrip} className="px-3 py-1 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number.isRequired,
    destination: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    mode_of_travel: PropTypes.shape({
      type_of_travel: PropTypes.string,
    }),
    number_of_travelers: PropTypes.number.isRequired,
    notes: PropTypes.string,
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
