// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

'use client';

import { onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getUserProfile } from '../auth';
import { auth } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  const updateUserProfile = (profile) => {
    if (user) {
      setUser((currentUser) => ({
        ...currentUser,
        profile,
      }));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user profile from backend
          const profile = await getUserProfile(firebaseUser.uid);
          setUser({ ...firebaseUser, profile });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
      setInitialLoad(false);
    });

    // Set a timeout to handle very first load
    const timeout = setTimeout(() => {
      setInitialLoad(false);
    }, 1000); // Wait for 1 second max on initial load

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading: loading && !initialLoad, // Only show loading after initial auth check
      initialLoad,
      updateUserProfile,
    }),
    [user, loading, initialLoad],
  );

  // Show children immediately if we're not in initial load
  // This allows SignIn to show immediately while still checking auth
  return <AuthContext.Provider value={value}>{!initialLoad && children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
