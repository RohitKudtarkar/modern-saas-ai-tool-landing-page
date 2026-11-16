import {
  LayoutDashboard,
  Sparkles,
  FileText,
  BarChart3,
  Clock,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function DashboardSidebar() {
  const navigationItems = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "AI Content",
      path: "/dashboard/ai-content",
      icon: Sparkles,
    },
    {
      label: "Documents",
      path: "/dashboard/documents",
      icon: FileText,
    },
    {
      label: "Analytics",
      path: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      label: "History",
      path: "/dashboard/history",
      icon: Clock,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-heading">Workspace</div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default DashboardSidebar;