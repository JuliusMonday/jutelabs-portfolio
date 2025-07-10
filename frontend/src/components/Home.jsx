import './Home.css';

const Home = () => (
  <section id="home" className="hero">
    <div className="hero-bg" />

    <div className="floating-shape shape-1" />
    <div className="floating-shape shape-2" />
    <div className="floating-shape shape-3" />

    <div className="container">
      <div className="content">
        <h1>
          <span className="block">I&apos;m Monday</span>
          <span className="block gradient-text">
            Chimaobi Julius
          </span>
        </h1>
        <p className="subtitle">
        Julius Technologies & Laboratories (JuTeLabs)
        Biochemist-turned full-stack engineer, graphic designer, and WordPress artisan. I bridge science and code, shaping backend APIs and dynamic frontends by day, crafting brand visuals and custom WordPress themes by night. <span className='gradient-text'>My work is as precise as lab protocols and as polished as top-tier design.</span>
        </p>
        <div className="actions">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Get in Touch</a>
        </div>
      </div>
    </div>
  </section>
);

export default Home;
