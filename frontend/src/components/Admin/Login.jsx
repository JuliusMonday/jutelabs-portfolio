import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/login`, {
        username,
        password,
      });

      // Save token and navigate
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a192f] text-[#d9e3f0] px-4">
      <div className="max-w-md w-full bg-[#112240] p-8 rounded-xl shadow-lg border border-[#22d39a]/20">
        <h2 className="text-3xl font-bold text-center text-[#00ffff] mb-6">Admin Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded-md focus:outline-none focus:border-[#00ffff] text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded-md focus:outline-none focus:border-[#00ffff] text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#00ffff] hover:bg-[#22d39a] text-[#0a192f] font-bold rounded-md transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
