import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

export default function CommentAdmin() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/comments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(data);
    } catch (err) {
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/comments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComments(comments.filter(c => c._id !== id));
      } catch (err) {
        alert('Failed to delete comment');
      }
    }
  };

  if (loading) return <div className="text-white">Loading comments...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Comments</h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-[#112240] rounded-xl border border-[#d9e3f0]/10 overflow-hidden">
        {comments.length === 0 ? (
          <p className="p-6 text-gray-400 text-center">No comments have been posted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-[#0a192f] text-[#00ffff] border-b border-[#d9e3f0]/10 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">On Post</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d9e3f0]/10">
                {comments.map((comment) => (
                  <tr key={comment._id} className="hover:bg-[#0a192f]/50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-white">{comment.name}</div>
                      <div className="text-xs text-gray-400">{comment.email}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={comment.content}>
                      {comment.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {comment.blogId?.title || <span className="text-red-400 italic">Deleted Post</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleDelete(comment._id)}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                        title="Delete Comment"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
