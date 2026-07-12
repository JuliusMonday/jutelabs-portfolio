import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/testimonials`);
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 px-6 md:px-20 bg-[#112240] text-[#d9e3f0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Client <span className="text-[#00ffff]">Testimonials</span>
          </h2>
          <p className="mt-4 text-gray-400">What people are saying about my work.</p>
        </motion.div>

        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory custom-scrollbar">
          {testimonials.map((t, index) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="snap-center shrink-0 w-80 md:w-96 bg-[#0a192f] p-8 rounded-2xl shadow-xl border border-[#00ffff]/10 relative"
            >
              <Quote className="absolute top-6 right-6 text-[#00ffff]/20" size={48} />
              
              <div className="flex items-center gap-4 mb-6">
                {t.image ? (
                  <img src={t.image} alt={t.clientName} className="w-14 h-14 rounded-full object-cover border-2 border-[#22d39a]" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[#112240] flex items-center justify-center text-[#22d39a] font-bold text-2xl border-2 border-[#00ffff]/30">
                    {t.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-white text-lg">{t.clientName}</h4>
                  <p className="text-sm text-[#00ffff]">{t.company}</p>
                </div>
              </div>
              
              <div className="flex text-[#22d39a] mb-4">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-300 italic leading-relaxed line-clamp-4 relative z-10">
                "{t.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
