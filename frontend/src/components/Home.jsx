import React from 'react'
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import About from './About.jsx'
import Services from './Services.jsx'
import Expertise from './Expertise.jsx'
import Projects from './Projects.jsx'
import Testimonials from './Testimonials.jsx'
import LatestArticles from './LatestArticles.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'

export default function Home() {
  return (
    <div className="antialiased text-gray-900 bg-white min-h-screen">
      <Header />
      <main className="pt-0">
        <Hero />
        <About />
        <Services />
        <Expertise />
        <Projects />
        <Testimonials />
        <LatestArticles />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
