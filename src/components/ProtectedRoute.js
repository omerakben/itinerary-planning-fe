'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  // If loading or no user, don't render children
  if (loading || !user) {
    return null;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
