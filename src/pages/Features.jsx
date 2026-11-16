
import { Sparkles, FileText, BarChart3, Workflow, PenTool, TrendingUp } from "lucide-react";

function Features() {
  return (
    <main className="features-page">
      <section className="features-hero">
        <span className="section-badge">POWERFUL FEATURES</span>
        <h1>Everything you need to work smarter</h1>
        <p>
          Discover powerful tools designed to simplify your workflow,
          improve productivity, and help you get more done.
        </p>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <Sparkles size={28} />
          <h2>AI Content Generation</h2>
          <p>Create blog ideas, social media posts, product descriptions and more.</p>
        </div>

        <div className="feature-card">
          <FileText size={28} />
          <h2>Document Summary</h2>
          <p>Upload documents and extract readable text for easier review.</p>
        </div>

        <div className="feature-card">
          <BarChart3 size={28} />
          <h2>Smart Data Analysis</h2>
          <p>Organize information and explore useful data insights.</p>
        </div>

        <div className="feature-card">
          <Workflow size={28} />
          <h2>Workflow Automation</h2>
          <p>Plan tasks and organize repetitive workflows in one place.</p>
        </div>

        <div className="feature-card">
          <PenTool size={28} />
          <h2>AI Writing Assistant</h2>
          <p>Improve drafts, refine wording and organize your ideas.</p>
        </div>

        <div className="feature-card">
          <TrendingUp size={28} />
          <h2>Productivity Insights</h2>
          <p>Review your projects and track your productivity progress.</p>
        </div>
      </section>
    </main>
  );
}

export default Features;
