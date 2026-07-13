import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BlogAdmin({ setActiveTab, setEditingPostId }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/blogs/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingPostId(blog._id);
    setActiveTab('blogs_edit');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBlogs();
      } catch (err) {
        alert('Failed to delete blog');
      }
    }
  };

  if (loading) return <div className="text-white">Loading blogs...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Blog Posts</h2>
        <button 
          onClick={() => {
            setEditingPostId(null);
            setActiveTab('blogs_add');
          }}
          className="px-4 py-2 bg-[#22d39a] text-[#0a192f] font-bold rounded hover:bg-[#00ffff] transition"
        >
          Write New Article
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {blogs.map(b => (
          <div key={b._id} className="bg-[#112240] rounded-xl overflow-hidden shadow-lg border border-[#d9e3f0]/10 flex flex-col">
            {b.coverImage && <img src={b.coverImage} alt={b.title} className="w-full h-48 object-cover" />}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
              {b.publishedAt && new Date(b.publishedAt) > new Date() && (
                <span className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded w-max mb-2">Scheduled for {new Date(b.publishedAt).toLocaleString()}</span>
              )}
              <p className="text-sm text-gray-400 flex-1">{b.excerpt}</p>
              <div className="mt-4 flex space-x-3 border-t border-[#d9e3f0]/10 pt-4">
                <button onClick={() => handleEdit(b)} className="flex-1 py-1.5 bg-[#d9e3f0]/10 text-white rounded hover:bg-[#d9e3f0]/20 transition">Edit</button>
                <button onClick={() => handleDelete(b._id)} className="flex-1 py-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <p className="col-span-full text-center py-10 text-gray-400">No blog posts yet. Write your first article!</p>
        )}
      </div>
    </div>
  );
}
