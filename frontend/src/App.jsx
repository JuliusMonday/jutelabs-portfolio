import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProject, setShowProject] = useState(true)
  // Apply theme class to document body so it affects the entire page
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // useEffect(() => {
  //   // Set a timer to hide the component after 1 minute
  //   const timer = setTimeout(() => {
  //     setShowProject(false);
  //   }, 60000); // 60,000 ms = 1 minute

  //   // Cleanup the timer on unmount
  //   return () => clearTimeout(timer);
  // }, []);


  return (
    <>
      <NavBar isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
      <main>
        <Home />
        <Skills />
        {/* <div className="projects">
          {showProject && <Projects />}
        </div> */}
        <Projects/>
        <Contact />
        <Footer/>
      </main>
    </>
  );
};
export default App;