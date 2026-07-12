import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/blogs`);
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#d9e3f0] py-24 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#22d39a] hover:text-[#00ffff] mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Articles & <span className="text-[#00ffff]">Insights</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            I write about software engineering, frontend architecture, building custom WordPress solutions, 
            and the intersection of science and technology.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-[#00ffff]">Loading articles...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#112240] rounded-2xl overflow-hidden shadow-xl border border-[#00ffff]/10 hover:border-[#00ffff]/30 transition-colors group flex flex-col"
              >
                <div className="h-48 overflow-hidden bg-[#0a192f]">
                  {blog.coverImage ? (
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#00ffff] opacity-30">
                      <span className="font-bold text-2xl">JuTeLabs</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar size={14} />
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ffff] transition-colors line-clamp-2">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>
                  
                  <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-[#22d39a] text-sm font-bold hover:text-[#00ffff] transition-colors mt-auto">
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {blogs.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-400 border border-dashed border-[#d9e3f0]/20 rounded-xl">
                <p className="text-xl mb-2">No articles published yet.</p>
                <p>Check back soon for new content!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
