import { useState } from 'react';
import { signIn } from '../utils/auth';
import ProfileSetup from './ProfileSetup';

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [needsProfile, setNeedsProfile] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, profile } = await signIn();
      setCurrentUser(user);
      if (!profile) {
        setNeedsProfile(true);
      }
      // If profile exists, you can redirect to the main app here
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileComplete = () => {
    // Redirect to main app after profile completion
    setNeedsProfile(false);
    // Add your navigation logic here
    window.location.href = '/'; // or use your router's navigation
  };

  if (needsProfile && currentUser) {
    return <ProfileSetup user={currentUser} onComplete={handleProfileComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center items-center min-h-screen p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Itinerary</h1>
            <p className="text-gray-600">Plan your perfect trip with us</p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

          <button type="button" onClick={handleSignIn} disabled={isLoading} className={`w-full flex items-center justify-center gap-3 px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {!isLoading && (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
