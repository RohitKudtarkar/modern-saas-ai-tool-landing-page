
import { useEffect, useState } from "react";
import { Search, Trash2, FileText, Sparkles, Clock, History as HistoryIcon } from "lucide-react";
import DashboardSidebar from "../components/DashboardSidebar";
import { useToast } from "../context/ToastContext";
import {
  getUserHistory,
  saveUserHistory,
  clearUserHistory,
} from "../utils/historyUtils";

function History() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const { showToast, showPopup } = useToast();

  // Load history from localStorage
  useEffect(() => {
  setHistory(getUserHistory());
}, []);

  // Delete one history item
  const handleDelete = (id) => {
  showPopup({
    title: "Delete Activity?",
    message: "Are you sure you want to delete this activity? This action cannot be undone.",
    type: "warning",
    confirmText: "Confirm",
    cancelText: "Cancel",

    onConfirm: () => {
      const updatedHistory = history.filter(
        (item) => item.id !== id
      );

      setHistory(updatedHistory);

      saveUserHistory(updatedHistory);
      
      showToast("Activity deleted successfully.", "success");
    },
  });
};

  // Clear all history
  
const handleClearAll = () => {
  if (history.length === 0) return;

  showPopup({
    title: "Clear All History?",
    message:
      "Are you sure you want to delete all activity history? This action cannot be undone.",
    type: "warning",
    confirmText: "Clear All",
    cancelText: "Cancel",

    onConfirm: () => {
      setHistory([]);
      clearUserHistory();

      showToast(
        "All activity history cleared successfully.",
        "success"
      );
    },
  });
};

  // Filter and search history
  const filteredHistory = history.filter((item) => {
    const matchesType =
      filterType === "all" || item.type === filterType;

    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchText) ||
      (item.prompt || "").toLowerCase().includes(searchText) ||
      (item.content || "").toLowerCase().includes(searchText);

    return matchesType && matchesSearch;
  });

  // Format date and time
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleString();
  };

  return (
   <main className="dashboard-page">
  <DashboardSidebar />

  <section className="dashboard-main">
    <div className="history-page">
        <div className="history-header">
          <div>
            <h1>Activity History</h1>
            <p>View and manage your previous activities.</p>
          </div>

          {history.length > 0 && (
            <button
              className="history-clear-button"
              onClick={handleClearAll}
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        <div className="history-summary-card">
          <div className="history-summary-icon">
            <HistoryIcon size={22} />
          </div>

          <div>
            <span>Total Activities</span>
            <h2>{history.length}</h2>
          </div>
        </div>

        <div className="history-toolbar">
          <div className="history-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="history-filter"
          >
            <option value="all">All Activities</option>
            <option value="content">AI Content</option>
            <option value="document">Documents</option>
          </select>
        </div>

        <div className="history-list">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <article className="history-item" key={item.id}>
                <div className="history-item-icon">
                  {item.type === "document" ? (
                    <FileText size={20} />
                  ) : (
                    <Sparkles size={20} />
                  )}
                </div>

                <div className="history-item-content">
                  <div className="history-item-heading">
                    <div>
                      <h3>{item.title || "Untitled Activity"}</h3>

                      <span className="history-item-type">
                        {item.type === "document"
                          ? "Document Summary"
                          : "AI Content"}
                      </span>
                    </div>

                    <button
                      className="history-delete-button"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Delete history item"
                      title="Delete activity"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  {item.prompt && (
                    <p className="history-item-prompt">
                      <strong>Prompt:</strong> {item.prompt}
                    </p>
                  )}

                  <p className="history-item-preview">
                    {item.content || "No preview available"}
                  </p>

                  {item.type === "document" && (
                    <div className="history-document-details">
                      <span>{item.wordCount ?? 0} words</span>
                      <span>{item.characterCount ?? 0} characters</span>
                      <span>{item.summaryLength || "Medium"} summary</span>
                    </div>
                  )}

                  <div className="history-item-date">
                    <Clock size={14} />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="history-empty-state">
              <HistoryIcon size={42} />

              <h3>
                {history.length === 0
                  ? "No activity yet"
                  : "No matching activities"}
              </h3>

              <p>
                {history.length === 0
                  ? "Your AI content and document activities will appear here."
                  : "Try changing your search or activity filter."}
              </p>
            </div>
          )}
        </div>
         </div>
  </section>
</main>
  );
}

export default History;
