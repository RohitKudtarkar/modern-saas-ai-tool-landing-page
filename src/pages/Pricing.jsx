
import { Check, Sparkles, Zap, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      description: "Explore the essential productivity tools.",
      price: "$0",
      period: "/month",
      icon: <Sparkles size={24} />,
      features: [
        "Access to the workspace",
        "Basic document tools",
        "Content creation interface",
        "Personal dashboard",
        "Basic project organization",
      ],
      button: "Get Started Free",
      featured: false,
    },
    {
      name: "Professional",
      description: "More flexibility for growing productivity needs.",
      price: "$19",
      period: "/month",
      icon: <Zap size={24} />,
      features: [
        "Everything in Starter",
        "Expanded workspace tools",
        "Advanced project organization",
        "Content management",
        "Productivity insights",
        "Priority support (planned)",
      ],
      button: "Choose Professional",
      featured: true,
    },
    {
      name: "Business",
      description: "A flexible workspace for teams and businesses.",
      price: "$49",
      period: "/month",
      icon: <Building2 size={24} />,
      features: [
        "Everything in Professional",
        "Team workspace (planned)",
        "Shared project management (planned)",
        "Advanced analytics (planned)",
        "Team collaboration (planned)",
        "Dedicated support (planned)",
      ],
      button: "Choose Business",
      featured: false,
    },
  ];

  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <span className="section-badge">SIMPLE PRICING</span>
        <h1>Plans designed around your workflow</h1>
        <p>
          Start with the essentials and explore flexible plans
          as your productivity needs grow.
        </p>
      </section>

      <section className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`pricing-plan ${plan.featured ? "featured-plan" : ""}`}
            key={plan.name}
          >
            {plan.featured && (
              <span className="popular-label">POPULAR CHOICE</span>
            )}

            <div className="pricing-plan-icon">{plan.icon}</div>

            <h2>{plan.name}</h2>
            <p className="plan-description">{plan.description}</p>

            <div className="plan-price">
              <span>{plan.price}</span>
              <small>{plan.period}</small>
            </div>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`plan-button ${plan.featured ? "featured-button" : ""}`}
              onClick={() => {
                navigate("/signup", {
                  state: { showWelcomePopup: true },
                });
              }}
            >
              {plan.button}
            </button>
          </article>
        ))}
      </section>

      <p className="pricing-note">
        Pricing is illustrative for this portfolio project.
        Subscription payments and paid-plan features are not yet active.
      </p>
    </main>
  );
}

export default Pricing;
