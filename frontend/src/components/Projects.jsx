import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Use environment variable if available, else fallback to localhost for dev
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/projects`);
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-20 bg-[#0a192f] text-[#d9e3f0]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center md:text-left"
        >
          Featured <span className="text-[#00ffff]">Projects</span>
        </motion.h2>

        {loading ? (
          <div className="mt-10 flex justify-center text-[#00ffff]">Loading projects...</div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={p._id || p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col sm:flex-row items-center gap-4 bg-[#d9e3f0] text-[#0a192f] p-5 rounded-xl shadow-md hover:shadow-[0_0_15px_#00ffff55] transition-all"
              >
                {/* Image */}
                <div className="w-full sm:w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div>
                  <h4 className="font-semibold text-lg">{p.title}</h4>
                  <p className="text-sm mt-2 text-[#111111b3] leading-relaxed line-clamp-3">
                    {p.desc}
                  </p>
                  <div className="mt-3 text-sm font-medium text-[#22d39a] cursor-pointer hover:underline">
                    <Link to={`/project/${p._id}`}>
                      View case study →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <div className="col-span-full text-center text-gray-400">
                No projects found.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
