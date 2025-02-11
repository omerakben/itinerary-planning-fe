'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { deleteTrip } from '../api/tripsData';

// Component for displaying individual trip information in a card format
export default function TripCard({ trip, onView, onUpdate }) {
  const router = useRouter();

  // Format dates to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const deleteThisTrip = async () => {
    if (window.confirm('Delete this trip?')) {
      try {
        await deleteTrip(trip.id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group">
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
          <span>
            {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
          </span>
        </div>

        {/* Travel Mode */}
        <div className="flex items-center space-x-2">
          <Image src="/svg/card-travel-mode.svg" alt="Travel Mode" width={20} height={20} />
          <span>{trip.mode_of_travel?.type_of_travel || 'Not specified'}</span>
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

      <div className="mt-6 flex justify-between items-center">
        <Link href={`/trips/${trip.id}`} onClick={onView} className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
          <Image src="/svg/card-view-detailes.svg" alt="View Details" width={20} height={20} />
          <span>View</span>
        </Link>

        <div className="flex space-x-2">
          <button type="button" onClick={() => router.push(`/trips/edit/${trip.id}`)} className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            <Image src="/svg/card-edit.svg" alt="Edit" width={20} height={20} />
            <span>Edit</span>
          </button>

          <button type="button" onClick={deleteThisTrip} className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors">
            <Image src="/svg/card-delete.svg" alt="Delete" width={20} height={20} />
            <span>Delete</span>
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
