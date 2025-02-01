'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Handle mounting state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="min-h-screen p-6 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

            {/* Profile Information */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p id="name" className="mt-1 text-lg text-gray-900">
                  {user.profile?.name || user.displayName}
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p id="email" className="mt-1 text-lg text-gray-900">
                  {user.email}
                </p>
              </div>

              {user.profile?.bio && (
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <p id="bio" className="mt-1 text-lg text-gray-900">
                    {user.profile.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
