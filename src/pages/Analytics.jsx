import { useState } from "react";

import {
  BarChart3,
  TrendingUp,
  FileText,
  Sparkles,
  Activity,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";
import { getUserHistory } from "../utils/historyUtils";


function Analytics() {
  const [history] = useState(() => getUserHistory());

  const contentCount = history.filter(
    (item) => item.type === "content"
  ).length;

  const documentCount = history.filter(
    (item) => item.type === "document"
  ).length;

  const validHistory = history.filter((item) => {
    return item.createdAt && !Number.isNaN(
      new Date(item.createdAt).getTime()
    );
  });

  const activeDays = new Set(
    validHistory.map((item) => {
      const date = new Date(item.createdAt);

      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    })
  ).size;

  const stats = [
    {
      title: "Total Activities",
      value: history.length,
      icon: Activity,
      detail: "Total saved activities",
    },
    {
      title: "Content Created",
      value: contentCount,
      icon: Sparkles,
      detail: "Saved content activities",
    },
    {
      title: "Documents Processed",
      value: documentCount,
      icon: FileText,
      detail: "Saved document activities",
    },
    {
      title: "Active Days",
      value: activeDays,
      icon: TrendingUp,
      detail: "Days with recorded activity",
    },
  ];

  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(
    today.getDate() - ((today.getDay() + 6) % 7)
  );

  const activityData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const value = validHistory.filter((item) => {
      const activityDate = new Date(item.createdAt);

      return (
        activityDate.getFullYear() === date.getFullYear() &&
        activityDate.getMonth() === date.getMonth() &&
        activityDate.getDate() === date.getDate()
      );
    }).length;

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      value,
    };
  });

  const maxActivity =
  Math.max(10, Math.ceil(Math.max(...activityData.map((item) => item.value), 0) / 10) * 10);
  return (
    <main className="dashboard-page">
      <DashboardSidebar />

      <section className="dashboard-main">
        <div className="analytics-page">
          <header className="analytics-header">
            <div>
              <span className="section-badge">
                WORKSPACE INSIGHTS
              </span>
              <h1>Analytics</h1>
              <p>
                Explore activity and productivity insights.
              </p>
            </div>
          </header>

          <section className="analytics-stats">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  className="analytics-stat-card"
                  key={stat.title}
                >
                  <div className="analytics-stat-icon">
                    <Icon size={22} />
                  </div>

                  <span>{stat.title}</span>
                  <h2>{stat.value}</h2>
                  <small>{stat.detail}</small>
                </div>
              );
            })}
          </section>

          <section className="analytics-overview">
            <div className="analytics-section-heading">
              <div>
                <h2>Activity Overview</h2>
                <p>
                  Your workspace activity at a glance.
                </p>
              </div>

              <BarChart3 size={25} />
            </div>

            <div className="analytics-chart">
  <div className="analytics-chart-label">
    <span>Weekly Activity</span>
    <small>Activities recorded this week</small>
  </div>

  <div className="analytics-chart-bars">
    {activityData.map((item) => (
      <div className="analytics-chart-column" key={item.day}>
        <div className="analytics-chart-bar-wrapper">
          <div
            className="analytics-chart-bar"
            style={{
  height: `${(item.value / maxActivity) * 100}%`,
  minHeight: item.value > 0 ? "8px" : "0px",
}}
title={`${item.value} activities`}
          />
        </div>
        <span>{item.day}</span>
      </div>
    ))}
  </div>
</div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Analytics;
