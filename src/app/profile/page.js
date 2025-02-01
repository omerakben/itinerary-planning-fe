'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createOrUpdateUser } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

export default function ProfilePage() {
  const { user, loading, updateUserProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
  });

  // Check if this is the first time setup
  const isNewProfile = !user?.profile?.name;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
    if (user?.profile) {
      setFormData({
        name: user.profile.name || '',
        bio: user.profile.bio || '',
      });
    }
    // Automatically enter edit mode for new profiles
    if (isNewProfile) {
      setIsEditing(true);
    }
  }, [user, loading, router, isNewProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const updatedProfile = await createOrUpdateUser(user, formData);
      // Update the profile in the auth context
      updateUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const getButtonText = () => {
    if (isNewProfile) {
      return 'Complete Setup';
    }
    return 'Save Changes';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{isNewProfile ? 'Complete Your Profile' : 'Profile'}</h1>
              {isNewProfile && <p className="mt-2 text-gray-600">Tell us a little about yourself to get started</p>}
            </div>
            {!isNewProfile && !isEditing && (
              <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            )}
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              {isEditing ? <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" disabled={isSaving} required placeholder="Enter your name" /> : <p className="text-gray-900 py-2">{formData.name}</p>}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              {isEditing ? <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" disabled={isSaving} placeholder="Tell us about yourself..." /> : <p className="text-gray-900 py-2">{formData.bio || 'No bio added yet'}</p>}
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                {!isNewProfile && (
                  <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" disabled={isSaving}>
                    Cancel
                  </button>
                )}
                <button type="submit" disabled={isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50">
                  {isSaving ? 'Saving...' : getButtonText()}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
