
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Sparkles,
  FileText,
  BarChart3,
  Zap,
  CheckCircle2,
  PenLine,
  Workflow,
} from "lucide-react";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>THE FUTURE OF PRODUCTIVITY</span>
            </div>

            <h1>
              Work smarter with the
              <span> power of AI.</span>
            </h1>

            <p>
              Simplify your workflow, create better content, and
              get more done with intelligent productivity tools.
            </p>

            <div className="hero-buttons">
              <Link
                to="/signup"
                state={{ showWelcomePopup: true }}
                className="primary-button"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>

              <Link to="/features" className="secondary-button">
                Explore Features
              </Link>
            </div>

            <div className="hero-trust">
              <CheckCircle2 size={17} />
              <span>Free to get started. No credit card required.</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="dashboard-header">
                <div>
                  <span className="dashboard-label">OVERVIEW</span>
                  <h3>Your Workspace</h3>
                </div>
                <span className="dashboard-status">Demo Preview</span>
              </div>

              <div className="dashboard-welcome">
                <Sparkles size={22} />
                <div>
                  <h4>Your productivity hub</h4>
                  <p>Everything you need in one place.</p>
                </div>
              </div>

              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <span className="dashboard-card-icon">
                    <FileText size={21} />
                  </span>
                  <h4>Content Creation</h4>
                  <p>Create content faster.</p>
                </div>

                <div className="dashboard-card">
                  <span className="dashboard-card-icon">
                    <BarChart3 size={21} />
                  </span>
                  <h4>Smart Analysis</h4>
                  <p>Explore your information.</p>
                </div>

                <div className="dashboard-card">
                  <span className="dashboard-card-icon">
                    <Zap size={21} />
                  </span>
                  <h4>Workflow Tools</h4>
                  <p>Simplify daily tasks.</p>
                </div>
              </div>

              <div className="dashboard-bottom">
                <span>Workspace activity</span>
                <span className="activity-indicator">
                  <span></span> Ready
                </span>
              </div>

              <div className="dashboard-progress">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-section">
        <div className="container">
          <p>BUILT FOR PEOPLE WHO WANT TO WORK SMARTER</p>

          <div className="trusted-companies">
            <span>Content Creators</span>
            <span>Developers</span>
            <span>Marketing Teams</span>
            <span>Startups</span>
            <span>Businesses</span>
          </div>
        </div>
      </section>
      <section className="features-section">
        <div className="container">
          <div className="section-heading">
            <span>OUR FEATURES</span>
            <h2>Everything you need to work smarter</h2>
            <p>
              Powerful productivity tools designed to simplify
              your everyday tasks.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <Sparkles size={28} />
              <h3>AI Content Creation</h3>
              <p>Create engaging content and generate fresh ideas.</p>
            </div>

            <div className="feature-card">
              <FileText size={28} />
              <h3>Document Summary</h3>
              <p>Turn lengthy documents into clear summaries.</p>
            </div>

            <div className="feature-card">
              <BarChart3 size={28} />
              <h3>Smart Data Analysis</h3>
              <p>Understand information through simple insights.</p>
            </div>

            <div className="feature-card">
              <Workflow size={28} />
              <h3>Workflow Automation</h3>
              <p>Organize everyday tasks more efficiently.</p>
            </div>

            <div className="feature-card">
              <PenLine size={28} />
              <h3>AI Writing Assistant</h3>
              <p>Improve your writing with intelligent suggestions.</p>
            </div>

            <div className="feature-card">
              <Zap size={28} />
              <h3>Productivity Insights</h3>
              <p>Explore ways to improve your daily workflow.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="how-section">
        <div className="container">
          <div className="section-heading">
            <span>HOW IT WORKS</span>
            <h2>Get started in three simple steps</h2>
            <p>
              A simple workflow to help you get more done.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">
                <FileText size={28} />
              </div>
              <h3>Choose Your Tool</h3>
              <p>
                Explore the available productivity tools and
                choose the one that fits your task.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">
                <Sparkles size={28} />
              </div>
              <h3>Enter Your Details</h3>
              <p>
                Provide your content or information to get
                started with your chosen tool.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">
                <CheckCircle2 size={28} />
              </div>
              <h3>Review Your Results</h3>
              <p>
                Review the results and organize your work
                more efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pricing-section">
        <div className="container">
          <div className="section-heading">
            <span>SIMPLE PRICING</span>
            <h2>Choose the right plan for you</h2>
            <p>Start free and upgrade when you need more.</p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Starter</h3>
              <p className="pricing-description">For personal use</p>
              <div className="price">$0<span>/month</span></div>

              <ul>
                <li>Basic productivity tools</li>
                <li>Limited monthly usage</li>
                <li>Basic workspace access</li>
              </ul>

              <Link
                to="/signup"
                state={{ showWelcomePopup: true }}
                className="pricing-button"
              >
                Get Started
              </Link>
            </div>

            <div className="pricing-card popular">
              <span className="popular-badge">MOST POPULAR</span>
              <h3>Pro</h3>
              <p className="pricing-description">For growing teams</p>
              <div className="price">$19<span>/month</span></div>

              <ul>
                <li>Advanced productivity tools</li>
                <li>More monthly usage</li>
                <li>Priority workspace access</li>
              </ul>

              <Link
                to="/signup"
                state={{ showWelcomePopup: true }}
                className="pricing-button"
              >
                Get Started
              </Link>
            </div>

            <div className="pricing-card">
              <h3>Business</h3>
              <p className="pricing-description">For larger teams</p>
              <div className="price">$49<span>/month</span></div>

              <ul>
                <li>All Pro features</li>
                <li>Extended monthly usage</li>
                <li>Team workspace access</li>
              </ul>

              <Link
                to="/signup"
                state={{ showWelcomePopup: true }}
                className="pricing-button"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="benefits-section">
        <div className="container benefits-container">
          <div className="benefits-content">
            <span className="section-label">WHY CHOOSE US</span>

            <h2>
              A smarter way to manage your everyday work.
            </h2>

            <p>
              Bring your productivity tools together in one simple
              workspace. Spend less time on repetitive tasks and
              more time on what matters.
            </p>

            <div className="benefit-item">
              <CheckCircle2 size={21} />
              <div>
                <h4>Simple and Easy to Use</h4>
                <p>A clean experience designed for everyday productivity.</p>
              </div>
            </div>

            <div className="benefit-item">
              <CheckCircle2 size={21} />
              <div>
                <h4>Organized Workspace</h4>
                <p>Keep your tools and tasks together in one place.</p>
              </div>
            </div>

            <div className="benefit-item">
              <CheckCircle2 size={21} />
              <div>
                <h4>Flexible for Everyone</h4>
                <p>Useful for creators, developers, teams, and businesses.</p>
              </div>
            </div>

            <Link to="/about" className="benefits-link">
              Learn More <ArrowRight size={17} />
            </Link>
          </div>

          <div className="benefits-visual">
            <div className="benefits-visual-card">
              <div className="benefits-visual-icon">
                <Sparkles size={34} />
              </div>
              <h3>Work Smarter</h3>
              <p>Make your daily workflow simpler and more organized.</p>

              <div className="benefits-mini-card">
                <CheckCircle2 size={19} />
                <span>Productivity made simple</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonials-section">
        <div className="container">
          <div className="section-heading">
            <span>TESTIMONIALS</span>
            <h2>Designed to make work feel easier.</h2>
            <p>
              Sample feedback illustrating the kind of experience
              this productivity platform aims to provide.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>
                "Having everything organized in one workspace
                makes my daily tasks feel much simpler."
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">C</div>
                <div>
                  <h4>Content Creator</h4>
                  <span>Sample profile</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>
                "The clean interface makes it easy to explore
                tools and keep track of my work."
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">D</div>
                <div>
                  <h4>Developer</h4>
                  <span>Sample profile</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>
                "A simple workspace concept that helps bring
                everyday productivity tasks together."
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">M</div>
                <div>
                  <h4>Marketing Professional</h4>
                  <span>Sample profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section">
        <div className="container">
          <div className="section-heading">
            <span>FAQ</span>
            <h2>Frequently asked questions.</h2>
            <p>
              Find answers to common questions about our productivity platform.
            </p>
          </div>

          <div className="faq-list">
            <details className="faq-item">
              <summary>What is this platform?</summary>
              <p>
                It is a productivity platform concept designed to bring
                useful tools and everyday workflows together.
              </p>
            </details>

            <details className="faq-item">
              <summary>Is it free to get started?</summary>
              <p>
                The sample pricing includes a free Starter plan.
                All prices are for portfolio demonstration purposes.
              </p>
            </details>

            <details className="faq-item">
              <summary>Do I need technical knowledge to use it?</summary>
              <p>
                The platform concept is designed with a simple,
                beginner-friendly interface.
              </p>
            </details>

            <details className="faq-item">
              <summary>Does the platform currently process AI requests?</summary>
              <p>
                No. This portfolio project demonstrates the frontend
                experience. AI processing and backend services are not connected.
              </p>
            </details>

            <details className="faq-item">
              <summary>Can I use it on mobile devices?</summary>
              <p>
                The website interface is designed to adapt to desktop,
                tablet, and mobile screen sizes.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
