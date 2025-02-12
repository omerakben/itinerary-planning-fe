'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { deleteTrip } from '../api/tripsData';
import { CarIcon, PlaneIcon, TrainIcon, WalkingIcon } from './Icons';

// Component for displaying individual trip information in a card format
export default function TripCard({ trip, onView, onUpdate }) {
  const router = useRouter();

  // Format dates to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTravelModeIcon = (mode) => {
    if (!mode?.type_of_travel) return <CarIcon className="text-gray-500" />;

    switch (mode.type_of_travel.toLowerCase()) {
      case 'plane':
        return <PlaneIcon className="text-gray-500" />;
      case 'train':
        return <TrainIcon className="text-gray-500" />;
      case 'automobile':
        return <CarIcon className="text-gray-500" />;
      case 'walking':
        return <WalkingIcon className="text-gray-500" />;
      default:
        return <CarIcon className="text-gray-500" />;
    }
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
    <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group">
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{trip.destination}</h3>
          <Image src="/svg/card-location.svg" alt="Location" width={24} height={24} className="text-gray-500 flex-shrink-0 ml-2" />
        </div>
      </div>

      <div className="space-y-3 text-gray-600">
        {/* Dates with calendar icon */}
        <div className="flex items-center space-x-2">
          <Image src="/svg/card-calendar.svg" alt="Calendar" width={20} height={20} className="flex-shrink-0" />
          <span className="text-sm md:text-base">
            {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
          </span>
        </div>

        {/* Travel Mode */}
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 flex-shrink-0">{getTravelModeIcon(trip.mode_of_travel)}</div>
          <span className="text-sm md:text-base">{trip.mode_of_travel?.type_of_travel || 'Not specified'}</span>
        </div>

        {/* Travelers */}
        <div className="flex items-center space-x-2">
          <Image src="/svg/card-travelers.svg" alt="Travelers" width={20} height={20} className="flex-shrink-0" />
          <span className="text-sm md:text-base">{trip.number_of_travelers} travelers</span>
        </div>

        {/* Notes */}
        {trip.notes && (
          <div className="flex items-start space-x-2">
            <Image src="/svg/card-notes.svg" alt="Notes" width={20} height={20} className="mt-1 flex-shrink-0" />
            <p className="text-sm line-clamp-2">{trip.notes}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <Link href={`/trips/${trip.id}`} onClick={onView} className="flex items-center justify-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
          <Image src="/svg/card-view-detailes.svg" alt="View Details" width={20} height={20} className="flex-shrink-0" />
          <span>View</span>
        </Link>

        <div className="flex flex-col sm:flex-row gap-2">
          <button type="button" onClick={() => router.push(`/trips/edit/${trip.id}`)} className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
            <Image src="/svg/card-edit.svg" alt="Edit" width={20} height={20} className="flex-shrink-0" />
            <span>Edit</span>
          </button>

          <button type="button" onClick={deleteThisTrip} className="flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
            <Image src="/svg/card-delete.svg" alt="Delete" width={20} height={20} className="flex-shrink-0" />
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
