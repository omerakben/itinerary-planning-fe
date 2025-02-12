'use client';

import { useEffect, useState } from 'react';
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              {!isEditing && (
                <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Edit Profile
                </button>
              )}
            </div>

            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50" />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} required rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50" />
                  <p className="mt-1 text-sm text-gray-500">Share your interests, travel preferences, or anything else you&apos;d like others to know.</p>
                </div>

                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isLoading} className="create-final-button disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-700">Name</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.profile?.name || user.displayName}</p>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-700">Email</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                </div>

                {user.profile?.bio && (
                  <div>
                    <h2 className="text-sm font-medium text-gray-700">Bio</h2>
                    <p className="mt-1 text-lg text-gray-900">{user.profile.bio}</p>
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
