
import {
  Target,
  Lightbulb,
  Users,
  ShieldCheck,
  Rocket,
  Heart,
} from "lucide-react";

function About() {
  const values = [
    {
      icon: <Lightbulb size={25} />,
      title: "Simplicity",
      description:
        "We believe productivity tools should be easy to understand and simple to use.",
    },
    {
      icon: <Users size={25} />,
      title: "User Focus",
      description:
        "Every part of the experience should help users organize their work more effectively.",
    },
    {
      icon: <ShieldCheck size={25} />,
      title: "Transparency",
      description:
        "Clear information about features, limitations and how the platform works.",
    },
    {
      icon: <Rocket size={25} />,
      title: "Continuous Growth",
      description:
        "A platform designed to evolve with changing productivity needs.",
    },
  ];

  return (
    <main className="about-page">
      <section className="about-hero">
        <span className="section-badge">ABOUT OUR PLATFORM</span>
        <h1>A simpler way to organize your digital work</h1>
        <p>
          We are building a unified workspace that brings useful
          productivity tools together in one accessible experience.
        </p>
      </section>

      <section className="about-mission">
        <div className="mission-icon">
          <Target size={32} />
        </div>

        <div className="mission-content">
          <span className="about-label">OUR MISSION</span>
          <h2>Make everyday work easier to manage</h2>
          <p>
            Managing content, documents and everyday tasks can become
            complicated when everything is spread across different tools.
            Our goal is to create a simple workspace where people can
            organize these activities more conveniently.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="values-heading">
          <span className="section-badge">WHAT GUIDES US</span>
          <h2>Our core values</h2>
          <p>
            The principles behind the experience we want to build.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.title}>
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-vision">
        <div className="vision-icon">
          <Heart size={28} />
        </div>
        <h2>Our vision for better productivity</h2>
        <p>
          We envision a workspace where useful tools, clear design
          and thoughtful functionality work together to make digital
          tasks easier to manage.
        </p>
      </section>
    </main>
  );
}

export default About;
