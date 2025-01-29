import { signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create or update user profile in backend
const createOrUpdateUser = async (user, profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profileData.name,
        bio: profileData.bio,
        uid: user.uid,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Get user profile from backend
const getUserProfile = async (uid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users?uid=${uid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    const users = await response.json();
    return users[0]; // Return first user since we're filtering by uid
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const signIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Check if user profile exists
    const profile = await getUserProfile(result.user.uid);
    return { user: result.user, profile };
  } catch (error) {
    console.error('Error signing in with Google', error);
    throw error;
  }
};

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
    throw error;
  }
};

export { createOrUpdateUser, getUserProfile, signIn, signOut };
