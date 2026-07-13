import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MessageCircle, User } from 'lucide-react';
import DOMPurify from 'dompurify';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/blogs/${slug}`);
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/comments/blog/${slug}`);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchBlog();
    // We actually need the blogId to fetch comments, but our backend route takes blogId.
    // Wait, let's look at the backend route: router.get('/blog/:blogId' ...).
    // The `slug` in the URL might be the blog _id or slug string. If it's _id, this works.
    // Let's call fetchComments AFTER we have the blog._id.
  }, [slug]);

  useEffect(() => {
    if (blog && blog._id) {
      const fetchComments = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const { data } = await axios.get(`${apiUrl}/api/comments/blog/${blog._id}`);
          setComments(data);
        } catch (err) {
          console.error("Failed to fetch comments", err);
        }
      };
      fetchComments();
    }
  }, [blog]);

  // Handle adding copy buttons to code snippets
  useEffect(() => {
    if (!loading && blog) {
      const preElements = document.querySelectorAll('.prose pre');
      
      preElements.forEach((pre) => {
        // Prevent adding multiple wrappers if re-rendered
        if (pre.parentNode.classList.contains('code-block-wrapper')) return;

        // Create a wrapper for positioning
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper relative group mb-6 mt-6';
        pre.parentNode.insertBefore(wrapper, pre);
        
        // Remove default margins from pre since wrapper has them
        pre.style.margin = '0';
        wrapper.appendChild(pre);

        const button = document.createElement('button');
        button.className = 'absolute top-3 right-3 px-3 py-1 text-xs font-bold text-[#0a192f] bg-[#00ffff] rounded opacity-0 group-hover:opacity-100 transition-all hover:bg-[#22d39a] shadow-md';
        button.innerText = 'Copy';

        button.addEventListener('click', () => {
          navigator.clipboard.writeText(pre.innerText)
            .then(() => {
              button.innerText = 'Copied!';
              setTimeout(() => {
                button.innerText = 'Copy';
              }, 2000);
            })
            .catch(err => console.error('Failed to copy code', err));
        });

        wrapper.appendChild(button);
      });
    }
  }, [loading, blog]);

  if (loading) return <div className="min-h-screen bg-[#0a192f] flex justify-center items-center text-[#00ffff]">Loading article...</div>;
  if (error || !blog) return (
    <div className="min-h-screen bg-[#0a192f] flex flex-col justify-center items-center text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
      <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
      <Link to="/blog" className="px-6 py-3 bg-[#22d39a] text-[#0a192f] font-bold rounded-full hover:bg-[#00ffff] transition-colors">
        Back to Articles
      </Link>
    </div>
  );

  // Sanitize HTML from ReactQuill to prevent XSS
  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.email || !newComment.content) return;
    setSubmittingComment(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.post(`${apiUrl}/api/comments`, {
        ...newComment,
        blogId: blog._id
      });
      setComments([data, ...comments]); // add to top
      setNewComment({ name: '', email: '', content: '' });
    } catch (err) {
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#d9e3f0] py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#22d39a] hover:text-[#00ffff] mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Articles
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Calendar size={16} />
            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {blog.title}
          </h1>

          {blog.coverImage && (
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl border border-[#00ffff]/20">
              <img 
                src={blog.coverImage} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-[#00ffff] prose-a:text-[#22d39a] hover:prose-a:text-[#00ffff]
              prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-[#112240] prose-pre:border prose-pre:border-[#00ffff]/20"
            dangerouslySetInnerHTML={createMarkup(blog.content)}
          />

          {/* Comments Section */}
          <div className="mt-20 border-t border-[#00ffff]/20 pt-12">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <MessageCircle className="text-[#00ffff]" size={32} />
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <div className="bg-[#112240] p-6 sm:p-8 rounded-2xl border border-[#d9e3f0]/10 mb-12 shadow-lg">
              <h4 className="text-xl font-semibold text-[#00ffff] mb-6">Leave a Reply</h4>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name *</label>
                    <input 
                      type="text" required 
                      value={newComment.name} onChange={e => setNewComment({...newComment, name: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0a192f] border border-[#d9e3f0]/20 rounded-lg text-white focus:outline-none focus:border-[#22d39a] transition-colors" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Email * (Will not be published)</label>
                    <input 
                      type="email" required 
                      value={newComment.email} onChange={e => setNewComment({...newComment, email: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0a192f] border border-[#d9e3f0]/20 rounded-lg text-white focus:outline-none focus:border-[#22d39a] transition-colors" 
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Comment *</label>
                  <textarea 
                    required rows="4"
                    value={newComment.content} onChange={e => setNewComment({...newComment, content: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-[#d9e3f0]/20 rounded-lg text-white focus:outline-none focus:border-[#22d39a] transition-colors resize-y" 
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
                <button 
                  type="submit" disabled={submittingComment}
                  className="px-8 py-3 bg-[#00ffff] text-[#0a192f] font-bold rounded-full hover:bg-[#22d39a] transition-colors shadow-lg shadow-[#00ffff]/20"
                >
                  {submittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment._id} className="bg-[#112240]/50 p-6 rounded-xl border border-[#d9e3f0]/5 flex gap-4">
                  <div className="hidden sm:flex w-12 h-12 bg-[#0a192f] rounded-full items-center justify-center text-[#22d39a] border border-[#22d39a]/30 shrink-0">
                    <User size={24} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h5 className="font-bold text-white text-lg">{comment.name}</h5>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-gray-400 italic text-center py-8">Be the first to share your thoughts on this article!</p>
              )}
            </div>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
