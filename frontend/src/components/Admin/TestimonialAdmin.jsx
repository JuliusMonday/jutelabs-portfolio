import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestimonialAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/testimonials');
      setTestimonials(data);
    } catch (err) {
      console.error('Failed to load testimonials', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setClientName(t.clientName);
    setCompany(t.company || '');
    setReview(t.review);
    setRating(t.rating);
    setImage(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/testimonials/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTestimonials();
      } catch (err) {
        alert('Failed to delete testimonial');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData();
    formData.append('clientName', clientName);
    formData.append('company', company);
    formData.append('review', review);
    formData.append('rating', rating);
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
        await axios.put(`http://localhost:5000/api/testimonials/${editingId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/testimonials', formData, config);
      }
      
      setShowForm(false);
      setEditingId(null);
      setClientName('');
      setCompany('');
      setReview('');
      setRating(5);
      setImage(null);
      
      fetchTestimonials();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-white">Loading testimonials...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Testimonials</h2>
        <button 
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setClientName(''); setCompany(''); setReview(''); setRating(5); setImage(null);
          }}
          className="px-4 py-2 bg-[#22d39a] text-[#0a192f] font-bold rounded hover:bg-[#00ffff] transition"
        >
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#112240] p-6 rounded-xl w-full max-w-lg border border-[#00ffff]/30">
            <h2 className="text-2xl font-bold text-[#00ffff] mb-4">
              {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-white">Client Name</label>
                <input type="text" required value={clientName} onChange={e => setClientName(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Company / Project Name</label>
                <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Review</label>
                <textarea required value={review} onChange={e => setReview(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" rows="4"></textarea>
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Rating (1-5)</label>
                <input type="number" min="1" max="5" required value={rating} onChange={e => setRating(e.target.value)} className="w-full px-3 py-2 bg-[#0a192f] border border-[#d9e3f0]/20 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white">Client Photo (Optional)</label>
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
        {testimonials.map(t => (
          <div key={t._id} className="bg-[#112240] rounded-xl p-6 shadow-lg border border-[#d9e3f0]/10 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              {t.image ? (
                <img src={t.image} alt={t.clientName} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#0a192f] flex items-center justify-center text-[#00ffff] font-bold text-xl">
                  {t.clientName.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-bold text-white">{t.clientName}</h4>
                <p className="text-xs text-[#22d39a]">{t.company}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 italic flex-1">"{t.review}"</p>
            <div className="mt-4 flex space-x-3 border-t border-[#d9e3f0]/10 pt-4">
              <button onClick={() => handleEdit(t)} className="flex-1 py-1 bg-[#d9e3f0]/10 text-white rounded hover:bg-[#d9e3f0]/20 transition">Edit</button>
              <button onClick={() => handleDelete(t._id)} className="flex-1 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition">Delete</button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="col-span-full text-center py-10 text-gray-400">No testimonials yet. Add reviews from Google My Business!</p>
        )}
      </div>
    </div>
  );
}
