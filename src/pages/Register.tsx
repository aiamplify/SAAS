import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import FormInput from '../components/FormInput';
import { useAuthStore } from '../lib/store';

export default function Register() {
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const name = formData.get('name') as string;

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call
      if (email && password && name) {
        setUser({
          id: '1',
          email,
          name,
          emailVerified: false,
        });
        navigate('/verify-email');
      } else {
        throw new Error('Invalid input');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Bot className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <FormInput
              label="Full Name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />

            <FormInput
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}