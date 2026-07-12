import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Code, Database, Briefcase, GraduationCap } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#0a192f]/90 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#112240] rounded-2xl border border-[#00ffff]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#d9e3f0]/10 bg-[#0a192f]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#22d39a]/20 flex items-center justify-center">
                <FileText className="text-[#22d39a]" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Monday Chimaobi Julius</h2>
                <p className="text-[#00ffff] font-medium">Full Stack Developer & Biochemist</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Note: Update href with actual resume PDF path when available */}
              <a 
                href="/resume.pdf" 
                download
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#d9e3f0]/10 text-white rounded-lg hover:bg-[#d9e3f0]/20 transition"
              >
                <Download size={18} />
                <span>Download PDF</span>
              </a>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-8">
                {/* Profile */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-[#00ffff]/30 pb-2 inline-block">Professional Profile</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Highly adaptable and detail-oriented Full Stack Developer with a unique background in Biochemistry. 
                    I specialize in building scalable web applications, custom WordPress themes, and performant MERN stack 
                    solutions. Passionate about solving complex problems through elegant code and logical architecture.
                  </p>
                </section>

                {/* Technical Skills */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-[#00ffff]/30 pb-2 inline-flex items-center gap-2">
                    <Code size={20} className="text-[#00ffff]" />
                    Technical Skills
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[#22d39a] font-semibold mb-2">Frontend Development</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Vanilla JS', 'HTML5/CSS3'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-[#0a192f] border border-[#d9e3f0]/20 rounded-full text-sm text-gray-300">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[#22d39a] font-semibold mb-2 flex items-center gap-2">
                        <Database size={16} /> Backend & Databases
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'Mongoose', 'PHP'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-[#0a192f] border border-[#d9e3f0]/20 rounded-full text-sm text-gray-300">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[#22d39a] font-semibold mb-2">CMS & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {['WordPress', 'Custom Theme Dev', 'Git/GitHub', 'Vercel', 'Postman', 'Figma'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-[#0a192f] border border-[#d9e3f0]/20 rounded-full text-sm text-gray-300">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Experience */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-[#00ffff]/30 pb-2 inline-flex items-center gap-2">
                    <Briefcase size={20} className="text-[#00ffff]" />
                    Experience
                  </h3>
                  <div className="space-y-6">
                    <div className="relative pl-6 border-l border-[#00ffff]/30">
                      <div className="absolute w-3 h-3 bg-[#00ffff] rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_#00ffff]" />
                      <h4 className="text-lg font-bold text-white">Founder & Lead Developer</h4>
                      <p className="text-[#22d39a] text-sm mb-2">JuTeLabs • 2024 - Present</p>
                      <p className="text-gray-400 text-sm">
                        Leading the development of modern web applications, custom CMS solutions, and 
                        portfolio designs. Orchestrated the delivery of projects like HealthStar EMS, FIDI, and 
                        Charles Osuji Foundation portals.
                      </p>
                    </div>
                    <div className="relative pl-6 border-l border-[#00ffff]/30">
                      <div className="absolute w-3 h-3 bg-[#22d39a] rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_#22d39a]" />
                      <h4 className="text-lg font-bold text-white">Freelance Web Developer</h4>
                      <p className="text-[#22d39a] text-sm mb-2">Independent • 2023 - 2024</p>
                      <p className="text-gray-400 text-sm">
                        Built responsive frontend architectures using React, Tailwind CSS, and Vanilla JS. 
                        Developed custom WordPress themes from scratch without page builders for elite performance.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-[#00ffff]/30 pb-2 inline-flex items-center gap-2">
                    <GraduationCap size={20} className="text-[#00ffff]" />
                    Education
                  </h3>
                  <div className="relative pl-6 border-l border-[#00ffff]/30">
                    <div className="absolute w-3 h-3 bg-[#00ffff] rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_#00ffff]" />
                    <h4 className="text-lg font-bold text-white">B.Sc. Biochemistry</h4>
                    <p className="text-[#22d39a] text-sm mb-2">University of Technology</p>
                    <p className="text-gray-400 text-sm">
                      Leveraged analytical and research skills developed through biochemical studies to architect 
                      logical code systems and troubleshoot complex software bugs.
                    </p>
                  </div>
                </section>
              </div>

            </div>
          </div>
          
          <div className="p-4 border-t border-[#d9e3f0]/10 bg-[#0a192f] sm:hidden flex justify-center">
            <a 
              href="/resume.pdf" 
              download
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#00ffff]/10 text-[#00ffff] rounded-lg border border-[#00ffff]/30"
            >
              <Download size={18} />
              <span>Download PDF</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
