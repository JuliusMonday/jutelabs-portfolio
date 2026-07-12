import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setExcerpt(blog.excerpt || '');
    setCoverImage(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBlogs();
      } catch (err) {
        alert('Failed to delete blog');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
        alert("Content is required");
        return;
    }
    setSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('excerpt', excerpt);
    if (coverImage) {
      formData.append('coverImage', coverImage);
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
        await axios.put(`http://localhost:5000/api/blogs/${editingId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/blogs', formData, config);
      }
      
      setShowForm(false);
      setEditingId(null);
      setTitle('');
      setContent('');
      setExcerpt('');
      setCoverImage(null);
      
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setSubmitting(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  if (loading) return <div className="text-white">Loading blogs...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Blog Posts</h2>
        <button 
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setTitle(''); setContent(''); setExcerpt(''); setCoverImage(null);
          }}
          className="px-4 py-2 bg-[#22d39a] text-[#0a192f] font-bold rounded hover:bg-[#00ffff] transition"
        >
          Write New Article
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#112240] p-6 rounded-xl w-full max-w-4xl border border-[#00ffff]/30 my-8">
            <h2 className="text-2xl font-bold text-[#00ffff] mb-4">
              {editingId ? 'Edit Article' : 'Write New Article'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-white">Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Excerpt / Short Description</label>
                <textarea required value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" rows="2"></textarea>
              </div>
              <div className="bg-white rounded text-black pb-12">
                <label className="block text-sm mb-1 text-white bg-[#112240] pt-2">Content (Block Editor)</label>
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  modules={quillModules}
                  className="h-64"
                />
              </div>
              <div className="pt-8">
                <label className="block text-sm mb-1 text-white">Cover Image {editingId && '(Leave empty to keep current)'}</label>
                <input type="file" accept="image/*" onChange={e => setCoverImage(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#00ffff] file:text-[#0a192f] file:font-semibold" />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#d9e3f0]/30 rounded hover:bg-[#d9e3f0]/10 text-white">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#00ffff] text-[#0a192f] font-bold rounded hover:bg-[#22d39a]">
                  {submitting ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {blogs.map(b => (
          <div key={b._id} className="bg-[#112240] rounded-xl overflow-hidden shadow-lg border border-[#d9e3f0]/10 flex flex-col">
            {b.coverImage && <img src={b.coverImage} alt={b.title} className="w-full h-48 object-cover" />}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
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
