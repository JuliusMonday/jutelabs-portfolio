import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import DOMPurify from 'dompurify';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    fetchBlog();
  }, [slug]);

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

          {/* Render Rich Text Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-[#00ffff] prose-a:text-[#22d39a] hover:prose-a:text-[#00ffff]
              prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-[#112240] prose-pre:border prose-pre:border-[#00ffff]/20"
            dangerouslySetInnerHTML={createMarkup(blog.content)}
          />
          
        </motion.div>
      </div>
    </div>
  );
}
