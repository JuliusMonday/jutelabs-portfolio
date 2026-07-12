import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CaseStudy() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Scroll to top when loading the page
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(data);
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <p className="text-[#00ffff] text-xl animate-pulse">Loading case study...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center space-y-4">
        <p className="text-red-400 text-xl">{error || 'Project not found.'}</p>
        <Link to="/" className="text-[#00ffff] hover:underline">&larr; Back to Portfolio</Link>
      </div>
    );
  }

  // Parse tech stack into an array
  const techTags = project.techStack 
    ? project.techStack.split(',').map(t => t.trim()).filter(Boolean) 
    : [];

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#d9e3f0] font-sans selection:bg-[#00ffff] selection:text-[#0a192f]">
      {/* Navigation */}
      <nav className="p-6 max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-[#00ffff] hover:text-[#22d39a] transition font-bold tracking-wide">
          &larr; Back to Portfolio
        </Link>
        <a href={project.link} target="_blank" rel="noreferrer" className="px-5 py-2 border border-[#00ffff] text-[#00ffff] rounded hover:bg-[#00ffff]/10 transition font-medium">
          Visit Live Site
        </a>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-[#8892b0] mb-8 max-w-2xl mx-auto">
          {project.desc}
        </p>
        
        {techTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {techTags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-[#112240] text-[#00ffff] rounded-full text-sm font-mono border border-[#00ffff]/20">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="w-full h-auto rounded-xl overflow-hidden shadow-2xl border border-[#22d39a]/20">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Details Section */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        
        {/* The Challenge */}
        <section>
          <div className="flex items-center space-x-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Challenge</h2>
            <div className="flex-1 h-px bg-[#22d39a]/30"></div>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-[#8892b0]">
            {project.challenge ? (
              <p className="whitespace-pre-wrap leading-relaxed">{project.challenge}</p>
            ) : (
              <p className="italic opacity-60">The challenge details are currently being updated.</p>
            )}
          </div>
        </section>

        {/* The Solution */}
        <section>
          <div className="flex items-center space-x-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Solution</h2>
            <div className="flex-1 h-px bg-[#22d39a]/30"></div>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-[#8892b0]">
            {project.solution ? (
              <p className="whitespace-pre-wrap leading-relaxed">{project.solution}</p>
            ) : (
              <p className="italic opacity-60">The solution details are currently being updated.</p>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center pt-10 pb-20 border-t border-[#112240]">
          <h3 className="text-2xl font-bold text-white mb-6">Want to see it in action?</h3>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-block px-8 py-4 bg-[#00ffff] text-[#0a192f] font-bold text-lg rounded hover:bg-[#22d39a] transition transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,255,255,0.2)]"
          >
            Visit Live Website
          </a>
        </section>

      </main>
    </div>
  );
}
