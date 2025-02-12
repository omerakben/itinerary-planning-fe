import PropTypes from 'prop-types';
import { useState } from 'react';
import { createOrUpdateUser } from '../utils/auth';

function ProfileSetup({ user, onComplete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    bio: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createOrUpdateUser(user, formData);
      onComplete();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen p-8 md:p-16 lg:p-32 transition-all">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-all border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <p className="text-gray-600 max-w-md mx-auto">Tell us about yourself to get started with Itinerary Planner</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all" placeholder="Enter your full name" />
              </div>

              {/* Bio Input */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} required rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all resize-none" placeholder="Tell us about your travel interests and preferences..." />
                <p className="mt-1 text-sm text-gray-500">Share your interests, travel preferences, or anything else you&apos;d like others to know.</p>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full create-final-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  <span>Setting Up...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete Setup</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

ProfileSetup.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ProfileSetup;
