'use client';

import { createTrip, updateTrip } from '@/api/tripsData';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const initialState = {
  destination: '',
  start_date: '',
  end_date: '',
  mode_of_travel_id: '',
  number_of_travelers: '',
  people_on_trip: '',
  notes: '',
};

// TODO: Add API calls for mode of travel
const travelModes = [
  { id: 1, type: 'Plane' },
  { id: 2, type: 'Train' },
  { id: 3, type: 'Automobile' },
  { id: 4, type: 'Walking' },
];

export default function TripForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

    if (obj.id) {
      try {
        await updateTrip(payload);
        router.push(`/trips/${obj.id}`);
      } catch (err) {
        setError('Failed to update trip. Please try again.');
        setLoading(false);
      }
    } else {
      try {
        await createTrip(payload);
        router.push('/trips');
      } catch (err) {
        console.error('Error creating trip:', err);
        setError('Unable to create trip. Please try refreshing the page and signing in again.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen p-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{obj.id ? 'Edit Trip' : 'Create New Trip'}</h1>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            <p className="text-sm">{error}</p>
            <button type="button" onClick={() => router.push('/')} className="text-sm text-red-700 hover:text-red-800 underline mt-2">
              Return to Dashboard
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          {/* Destination */}
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input type="text" id="destination" name="destination" value={formInput.destination} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Enter destination" />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input type="date" id="start_date" name="start_date" value={formInput.start_date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} max={formInput.end_date || undefined} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" />
            </div>
            <div>
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input type="date" id="end_date" name="end_date" value={formInput.end_date} onChange={handleChange} min={formInput.start_date || new Date().toISOString().split('T')[0]} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" />
            </div>
          </div>

          {/* Travel Mode */}
          <div>
            <label htmlFor="mode_of_travel_id" className="block text-sm font-medium text-gray-700 mb-1">
              Mode of Travel
            </label>
            <select id="mode_of_travel_id" name="mode_of_travel_id" value={formInput.mode_of_travel_id} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary">
              <option value="">Select travel mode</option>
              {travelModes.map((mode) => (
                <option key={mode.id} value={mode.id} selected={formInput.mode_of_travel_id === mode.id}>
                  {mode.type}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Travelers */}
          <div>
            <label htmlFor="number_of_travelers" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Travelers
            </label>
            <input type="number" id="number_of_travelers" name="number_of_travelers" value={formInput.number_of_travelers} onChange={handleChange} required min="1" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" />
          </div>

          {/* People on Trip */}
          <div>
            <label htmlFor="people_on_trip" className="block text-sm font-medium text-gray-700 mb-1">
              People on Trip
            </label>
            <input type="text" id="people_on_trip" name="people_on_trip" value={formInput.people_on_trip} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Enter names of travelers" />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea id="notes" name="notes" value={formInput.notes} onChange={handleChange} rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Add any notes about the trip" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => router.push('/trips')} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="neon-button">
              {loading ? 'Creating...' : ''}
              {obj.id && !loading ? 'Edit Trip' : ''}
              {!obj.id && !loading ? 'Create Trip' : ''}
            </button>
          </div>
        </div>

        {/* Travel Mode */}
        <div>
          <label htmlFor="mode_of_travel_id" className="block text-sm font-medium text-gray-700 mb-1">
            Mode of Travel
          </label>
          <select id="mode_of_travel_id" name="mode_of_travel_id" value={formInput.mode_of_travel_id} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Select travel mode</option>
            {travelModes.map((mode) => (
              <option key={mode.id} value={mode.id} selected={formInput.mode_of_travel_id === mode.id}>
                {mode.type}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Travelers */}
        <div>
          <label htmlFor="number_of_travelers" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Travelers
          </label>
          <input type="number" id="number_of_travelers" name="number_of_travelers" value={formInput.number_of_travelers} onChange={handleChange} required min="1" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" />
        </div>

        {/* People on Trip */}
        <div>
          <label htmlFor="people_on_trip" className="block text-sm font-medium text-gray-700 mb-1">
            People on Trip
          </label>
          <input type="text" id="people_on_trip" name="people_on_trip" value={formInput.people_on_trip} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Enter names of travelers" />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea id="notes" name="notes" value={formInput.notes} onChange={handleChange} rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="Add any notes about the trip" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => router.push('/trips')} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="neon-button">
            {loading ? 'Creating...' : ''}
            {obj.id && !loading ? 'Done' : ''}
            {!obj.id && !loading ? 'Create Trip' : ''}
          </button>
        </div>
      </form>
    </div>
  );
}

TripForm.propTypes = {
  obj: PropTypes.objectOf({}),
};
