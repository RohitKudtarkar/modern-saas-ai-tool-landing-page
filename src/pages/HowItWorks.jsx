
import {
  UserPlus,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <UserPlus size={28} />,
      title: "Create Your Account",
      description:
        "Get started by creating your account and accessing your personal workspace.",
      details: ["Simple sign-up process", "Personal workspace", "Easy navigation"],
    },
    {
      number: "02",
      icon: <LayoutDashboard size={28} />,
      title: "Choose Your Tool",
      description:
        "Explore the available productivity tools and select the one you need.",
      details: ["Content generation interface", "Document upload and extraction", "Organized dashboard"],
    },
    {
      number: "03",
      icon: <Sparkles size={28} />,
      title: "Create and Organize",
      description:
        "Work with your content, manage your documents and organize your projects.",
      details: ["Review your results", "Copy or download content", "Manage your work"],
    },
  ];

  return (
    <main className="how-it-works-page">
      <section className="how-hero">
        <span className="section-badge">HOW IT WORKS</span>
        <h1>Get started in three simple steps</h1>
        <p>
          A simple workspace designed to help you organize your work
          and make everyday tasks easier.
        </p>
      </section>

      <section className="steps-container">
        {steps.map((step, index) => (
          <div className="work-step" key={step.number}>
            <span className="step-number">{step.number}</span>

            <div className="step-icon">{step.icon}</div>

            <h2>{step.title}</h2>
            <p>{step.description}</p>

            <ul>
              {step.details.map((detail) => (
                <li key={detail}>
                  <CheckCircle2 size={17} />
                  {detail}
                </li>
              ))}
            </ul>

            {index !== steps.length - 1 && (
              <ArrowRight className="step-arrow" size={24} />
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default HowItWorks;
