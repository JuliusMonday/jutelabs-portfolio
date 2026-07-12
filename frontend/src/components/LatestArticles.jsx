import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/blogs`);
        setArticles(data.slice(0, 3)); // Only show latest 3
      } catch (error) {
        console.error("Failed to fetch articles", error);
      }
    };
    fetchArticles();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 px-6 md:px-20 bg-[#0a192f] text-[#d9e3f0]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest <span className="text-[#00ffff]">Articles</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl">Insights on software engineering, biochemistry, and modern web development.</p>
          </motion.div>
          
          <Link to="/blog" className="hidden sm:flex items-center gap-2 text-[#22d39a] hover:text-[#00ffff] font-medium transition-colors">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#112240] rounded-2xl overflow-hidden shadow-xl border border-[#00ffff]/10 hover:border-[#00ffff]/30 transition-colors group flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-[#0a192f]">
                {article.coverImage ? (
                  <img 
                    src={article.coverImage} 
                    alt={article.title} 
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
                  <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ffff] transition-colors line-clamp-2">
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>
                
                <Link to={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-[#22d39a] text-sm font-bold hover:text-[#00ffff] transition-colors mt-auto">
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 sm:hidden text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#22d39a] hover:text-[#00ffff] font-medium transition-colors">
            View All Articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
