import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProjectAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [techStack, setTechStack] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/projects');
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setTitle(project.title);
    setDesc(project.desc);
    setTechStack(project.techStack || '');
    setChallenge(project.challenge || '');
    setSolution(project.solution || '');
    setLink(project.link);
    setImage(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProjects();
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('techStack', techStack);
    formData.append('challenge', challenge);
    formData.append('solution', solution);
    formData.append('link', link);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/projects/${editingId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/projects', formData, config);
      }
      
      setShowForm(false);
      setEditingId(null);
      setTitle(''); setDesc(''); setTechStack(''); setChallenge(''); setSolution(''); setLink(''); setImage(null);
      
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-white">Loading projects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
        <button 
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setTitle(''); setDesc(''); setTechStack(''); setChallenge(''); setSolution(''); setLink(''); setImage(null);
          }}
          className="px-4 py-2 bg-[#22d39a] text-[#0a192f] font-bold rounded hover:bg-[#00ffff] transition"
        >
          Add New Project
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#112240] p-6 rounded-xl w-full max-w-lg border border-[#00ffff]/30 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-[#00ffff] mb-4">
              {editingId ? 'Edit Project' : 'Add Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-white">Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Description</label>
                <textarea required value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" rows="2"></textarea>
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Tech Stack (comma separated)</label>
                <input type="text" value={techStack} onChange={e => setTechStack(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">The Challenge</label>
                <textarea value={challenge} onChange={e => setChallenge(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" rows="2"></textarea>
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">The Solution</label>
                <textarea value={solution} onChange={e => setSolution(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" rows="2"></textarea>
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Live Link</label>
                <input type="url" required value={link} onChange={e => setLink(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Project Image</label>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#00ffff] file:text-[#0a192f] file:font-semibold" />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#d9e3f0]/30 rounded hover:bg-[#d9e3f0]/10 text-white">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#00ffff] text-[#0a192f] font-bold rounded hover:bg-[#22d39a]">
                  {submitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p._id} className="bg-[#112240] rounded-xl overflow-hidden shadow-lg border border-[#d9e3f0]/10 flex flex-col">
            <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-400 flex-1">{p.desc}</p>
              <div className="mt-4 flex space-x-3 border-t border-[#d9e3f0]/10 pt-4">
                <button onClick={() => handleEdit(p)} className="flex-1 py-1.5 bg-[#d9e3f0]/10 text-white rounded hover:bg-[#d9e3f0]/20 transition">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="flex-1 py-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
