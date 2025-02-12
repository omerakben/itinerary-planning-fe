'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createTrip, updateTrip } from '../../api/tripsData';
import { useAuth } from '../../utils/context/authContext';
import { CarIcon, PlaneIcon, TrainIcon, WalkingIcon } from '../Icons';

const initialState = {
  destination: '',
  start_date: '',
  end_date: '',
  mode_of_travel_id: '',
  number_of_travelers: '1',
  people_on_trip: '',
  notes: '',
};

const travelModes = [
  { id: 1, type: 'Plane', icon: <PlaneIcon /> },
  { id: 2, type: 'Train', icon: <TrainIcon /> },
  { id: 3, type: 'Automobile', icon: <CarIcon /> },
  { id: 4, type: 'Walking', icon: <WalkingIcon /> },
];

export default function TripForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id)
      setFormInput({
        ...obj,
        mode_of_travel_id: obj.mode_of_travel.id,
      });
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formInput,
      uid: user.uid,
      mode_of_travel_id: Number(formInput.mode_of_travel_id),
      number_of_travelers: Number(formInput.number_of_travelers),
    };

    try {
      if (obj.id) {
        await updateTrip(payload);
        router.push(`/trips/${obj.id}`);
      } else {
        await createTrip(payload);
        router.push('/trips');
      }
    } catch (err) {
      console.error('Error with trip:', err);
      setError(obj.id ? 'Failed to update trip. Please try again.' : 'Unable to create trip. Please try refreshing the page and signing in again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-16 lg:p-32 transition-all">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 md:p-8 shadow-lg border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{obj.id ? 'Edit Trip' : 'Create New Trip'}</h1>
            <button type="button" onClick={() => router.push('/trips')} className="text-gray-600 hover:text-gray-800">
              Back to Trips
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-grow">
                <p className="text-sm">{error}</p>
                <button type="button" onClick={() => router.push('/')} className="text-sm text-red-700 hover:text-red-800 underline mt-2">
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input type="text" id="destination" name="destination" value={formInput.destination} onChange={handleChange} onBlur={handleBlur} required className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all ${touched.destination && !formInput.destination ? 'border-red-500' : 'border-gray-300'}`} placeholder="Where are you heading?" />
              {touched.destination && !formInput.destination && <p className="mt-1 text-sm text-red-500">Please enter a destination</p>}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input type="date" id="start_date" name="start_date" value={formInput.start_date} onChange={handleChange} onBlur={handleBlur} min={new Date().toISOString().split('T')[0]} max={formInput.end_date || undefined} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all" />
              </div>
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input type="date" id="end_date" name="end_date" value={formInput.end_date} onChange={handleChange} onBlur={handleBlur} min={formInput.start_date || new Date().toISOString().split('T')[0]} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all" />
              </div>
            </div>

            {/* Travel Mode */}
            <div>
              <label htmlFor="mode_of_travel_id" className="block text-sm font-medium text-gray-700 mb-1">
                Mode of Travel
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {travelModes.map((mode) => (
                  <label key={mode.id} className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${Number(formInput.mode_of_travel_id) === mode.id ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'}`}>
                    <input type="radio" name="mode_of_travel_id" value={mode.id} checked={Number(formInput.mode_of_travel_id) === mode.id} onChange={handleChange} className="sr-only" />
                    <span className="text-2xl mb-1">{mode.icon}</span>
                    <span className="text-sm">{mode.type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Travelers and People */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="number_of_travelers" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Travelers
                </label>
                <input type="number" id="number_of_travelers" name="number_of_travelers" value={formInput.number_of_travelers} onChange={handleChange} onBlur={handleBlur} required min="1" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all" />
              </div>
              <div>
                <label htmlFor="people_on_trip" className="block text-sm font-medium text-gray-700 mb-1">
                  People on Trip
                </label>
                <input type="text" id="people_on_trip" name="people_on_trip" value={formInput.people_on_trip} onChange={handleChange} onBlur={handleBlur} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all" placeholder="Names of travelers" />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea id="notes" name="notes" value={formInput.notes} onChange={handleChange} onBlur={handleBlur} rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all resize-none" placeholder="Any special notes or plans for the trip?" />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
              <button type="button" onClick={() => router.push('/trips')} className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="w-full sm:w-auto create-final-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                    <span>{obj.id ? 'Updating...' : 'Creating...'}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{obj.id ? 'Update Trip' : 'Create Trip'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

TripForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    destination: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    mode_of_travel: PropTypes.shape({
      id: PropTypes.number,
    }),
    number_of_travelers: PropTypes.number,
    people_on_trip: PropTypes.string,
    notes: PropTypes.string,
  }),
};
