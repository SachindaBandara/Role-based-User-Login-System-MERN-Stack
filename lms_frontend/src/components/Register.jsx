import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(''); // State for password validation error

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if password is valid before submitting
    if (passwordError || !passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.'
      );
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      // Show success alert and clear input fields
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: response.data.message || 'User created successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      // Clear input fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <div className="font-display flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              className={`w-full text-sm px-3 py-2 border ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              } rounded-sm shadow-sm focus:outline-none focus:ring-2 ${
                passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {passwordError && (
              <p className="mt-1 text-xs text-red-500">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
