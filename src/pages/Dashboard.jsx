import React from "react";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  BarChart3,
  Clock,
  Settings,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { getUserHistory } from "../utils/historyUtils";


function Dashboard() {
  const [history] = React.useState(() => getUserHistory());

  const contentCount = history.filter(
    (item) => item.type === "content"
  ).length;

  const documentCount = history.filter(
    (item) => item.type === "document"
  ).length;

  const totalActivities = history.length;

  return (

    <main className="dashboard-page">
      <DashboardSidebar />

      <section className="dashboard-main" id="overview">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to your productivity workspace.</p>
          </div>

          <Link to="/dashboard/ai-content" className="dashboard-create-button">
            <Plus size={18} />
            Create New
          </Link>
        </header>

        <div className="dashboard-welcome">
          <div>
            <span>YOUR WORKSPACE</span>
            <h2>Make today more productive.</h2>
            <p>
              Explore your tools and organize your work
              from one place.
            </p>
          </div>

          <Sparkles size={55} />
        </div>

        
<div className="dashboard-stats">
  <div className="dashboard-stat-card">
    <span>Total Activities</span>
    <h3>{totalActivities}</h3>
    <small>
      <ArrowUpRight size={14} /> Total saved activities
    </small>
  </div>

  <div className="dashboard-stat-card">
    <span>Documents Processed</span>
    <h3>{documentCount}</h3>
    <small>
      <FileText size={14} /> Saved document activities
    </small>
  </div>

  <div className="dashboard-stat-card">
    <span>Content Created</span>
    <h3>{contentCount}</h3>
    <small>
      <Sparkles size={14} /> Saved content activities
    </small>
  </div>
</div>


        <div className="dashboard-section-heading">
          <h2>Quick Access</h2>
          <span>Explore your tools</span>
        </div>

        <div className="dashboard-tools">
          <Link to="/dashboard/ai-content" className="dashboard-tool-card">
            <Sparkles size={25} />
            <h3>AI Content Generator</h3>
            <p>Create and organize content.</p>
          </Link>

          <Link to="/dashboard/documents" className="dashboard-tool-card">
            <FileText size={25} />
            <h3>Document Summary</h3>
            <p>Review and summarize documents.</p>
          </Link>

          <Link to="/dashboard/analytics" className="dashboard-tool-card">
            <BarChart3 size={25} />
            <h3>Data Analysis</h3>
            <p>Explore information and insights.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;


