import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Image as ImageIcon, Calendar, Type } from 'lucide-react';
import BlockNoteEditor from './BlockNoteEditor.jsx';

export default function PostEditor({ postId, setActiveTab }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [publishedAt, setPublishedAt] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!!postId);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/blogs/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle(data.title);
      setContent(data.content);
      setExcerpt(data.excerpt || '');
      setPublishedAt(data.publishedAt ? new Date(data.publishedAt).toISOString().slice(0, 16) : '');
      setLoading(false);
    } catch (err) {
      console.error('Failed to load post', err);
      alert('Failed to load post data.');
      setActiveTab('blogs');
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    if (!content.trim()) {
      alert("Content is required");
      return;
    }
    
    setSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('excerpt', excerpt);
    if (publishedAt) formData.append('publishedAt', new Date(publishedAt).toISOString());
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

      if (postId) {
        await axios.put(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/blogs/${postId}`, formData, config);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/blogs`, formData, config);
      }
      
      setActiveTab('blogs');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-white">Loading editor...</div>;

  return (
    <div className="flex flex-col h-full -m-6 lg:-m-10"> {/* Negative margin to take up full space */}
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#112240] border-b border-[#00ffff]/10 shrink-0">
        <button 
          onClick={() => setActiveTab('blogs')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Posts</span>
        </button>
        <button
          onClick={handlePublish}
          disabled={submitting}
          className="px-6 py-2 bg-[#00ffff] text-[#0a192f] font-bold rounded hover:bg-[#22d39a] transition disabled:opacity-50"
        >
          {submitting ? (postId ? 'Updating...' : 'Publishing...') : (postId ? 'Update Post' : 'Publish')}
        </button>
      </div>

      {/* Main Editor Area + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left: Writing Area (White Background) */}
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="max-w-4xl mx-auto px-16 py-16">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className="w-full text-5xl font-bold text-gray-900 placeholder-gray-300 border-none outline-none bg-transparent mb-8"
            />
            
            <div className="min-h-[500px] text-gray-800">
              {/* IMPORTANT: No form wrapper here so Enter key works perfectly */}
              <BlockNoteEditor initialHTML={content} onChange={setContent} />
            </div>
          </div>
        </div>

        {/* Right: Settings Sidebar (Dark Theme) */}
        <div className="w-80 bg-[#0a192f] border-l border-[#00ffff]/10 p-6 overflow-y-auto shrink-0 flex flex-col gap-6">
          <h3 className="text-[#00ffff] font-bold text-lg mb-2">Post Settings</h3>
          
          {/* Cover Image */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-white font-medium text-sm">
              <ImageIcon size={16} /> Cover Image
            </label>
            <div className="border border-[#00ffff]/20 border-dashed rounded-lg p-4 text-center hover:bg-[#00ffff]/5 transition">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00ffff] file:text-[#0a192f] hover:file:bg-[#22d39a]"
              />
              {coverImage && <p className="text-[#00ffff] text-xs mt-2 truncate">{coverImage.name}</p>}
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-white font-medium text-sm">
              <Type size={16} /> Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows="4"
              placeholder="Write a short description..."
              className="w-full bg-[#112240] border border-[#00ffff]/20 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffff]"
            />
          </div>

          {/* Publish Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-white font-medium text-sm">
              <Calendar size={16} /> Publish Date
            </label>
            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full bg-[#112240] border border-[#00ffff]/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#00ffff]"
            />
            <p className="text-xs text-gray-400">Leave empty to publish immediately.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
