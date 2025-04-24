import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Skills from './components/Skills';
// import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme class to document body so it affects the entire page
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <>
      <NavBar isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
      <main>
        <Home />
        <Skills />
        {/* <Projects /> */}
        <Contact />
        <Footer/>
      </main>
    </>
  );
};
export default App;