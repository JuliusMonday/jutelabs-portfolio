import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from './DashboardLayout.jsx';
import ProjectAdmin from './ProjectAdmin.jsx';
import BlogAdmin from './BlogAdmin.jsx';
import TestimonialAdmin from './TestimonialAdmin.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);

  // Settings states
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsMsg('');
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/update`,
        { username: newUsername, password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Credentials updated successfully! Please log in again.');
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } catch (err) {
      setSettingsMsg(err.response?.data?.message || 'Failed to update credentials');
      setSettingsLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0a192f] text-white flex items-center justify-center">Loading...</div>;

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'projects' && <ProjectAdmin />}
      {activeTab === 'blogs' && <BlogAdmin />}
      {activeTab === 'testimonials' && <TestimonialAdmin />}
      
      {activeTab === 'settings' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Security Settings</h2>
          </div>
          <div className="max-w-md bg-[#112240] p-6 rounded-xl border border-[#00ffff]/30">
            <h3 className="text-xl font-bold text-[#00ffff] mb-6">Update Login Credentials</h3>
            {settingsMsg && <p className="text-red-400 mb-4">{settingsMsg}</p>}
            <form onSubmit={handleUpdateCredentials} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-white">New Username</label>
                <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" placeholder="Leave blank to keep current" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" placeholder="Leave blank to keep current" />
              </div>
              <button type="submit" disabled={settingsLoading} className="w-full py-2 mt-4 bg-[#00ffff] text-[#0a192f] font-bold rounded hover:bg-[#22d39a] transition">
                {settingsLoading ? 'Updating...' : 'Update Login Credentials'}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
