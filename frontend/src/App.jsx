import React from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Expertise from './components/Expertise.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="antialiased text-gray-900 bg-white min-h-screen">
      <Header />
      <main className="pt-0">
        <Hero />
        <About />
        <Services />
        <Expertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
