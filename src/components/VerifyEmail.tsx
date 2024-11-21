import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mail } from 'lucide-react';

export default function VerifyEmail() {
  const [resent, setResent] = React.useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    // Simulate API call to resend verification email
    setResent(true);
    setTimeout(() => setResent(false), 30000); // Reset after 30 seconds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <Mail className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleResend}
            disabled={resent}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium ${
              resent
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {resent ? 'Email sent' : 'Resend verification email'}
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Return to login
          </button>
        </div>
      </div>
    </div>
  );
}