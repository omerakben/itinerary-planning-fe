import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hi there!</h1>
      <p className="mb-4">Click the button below to login!</p>
      <button type="button" onClick={signIn} className="px-6 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
        Sign In
      </button>
    </div>
  );
}

export default Signin;
