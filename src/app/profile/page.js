'use client';

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import ProtectedRoute from '../../components/ProtectedRoute';
import { createOrUpdateUser } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

export default function ProfilePage() {
  const { user, loading, updateUserProfile } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.profile?.name || user?.displayName || '',
    bio: user?.profile?.bio || '',
  });

  // Handle mounting state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (user?.profile) {
      setFormData({
        name: user.profile.name || user.displayName || '',
        bio: user.profile.bio || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedProfile = await createOrUpdateUser(user, formData);
      updateUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner during hydration and initial auth check
  if (!mounted || loading) {
    return <Loading />;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8 md:p-16 lg:p-32 transition-all">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 md:p-8 shadow-lg border border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Profile</h1>
              {!isEditing && (
                <button type="button" onClick={() => setIsEditing(true)} className="w-full sm:w-auto px-4 py-2 text-blue-600 hover:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all" placeholder="Enter your full name" />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} required rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all resize-none" placeholder="Share your interests, travel preferences, or anything else you'd like others to know..." />
                    <p className="mt-1 text-sm text-gray-500">Share your interests, travel preferences, or anything else you&apos;d like others to know.</p>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setIsEditing(false)} className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    Cancel
                  </button>
                  <button type="submit" disabled={isLoading} className="w-full sm:w-auto create-final-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4">
                  <h2 className="text-sm font-medium text-gray-700 mb-1">Name</h2>
                  <p className="text-lg text-gray-900">{user.profile?.name || user.displayName}</p>
                </div>

                <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4">
                  <h2 className="text-sm font-medium text-gray-700 mb-1">Email</h2>
                  <p className="text-lg text-gray-900">{user.email}</p>
                </div>

                {user.profile?.bio && (
                  <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4">
                    <h2 className="text-sm font-medium text-gray-700 mb-1">Bio</h2>
                    <p className="text-lg text-gray-900 whitespace-pre-wrap">{user.profile.bio}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
