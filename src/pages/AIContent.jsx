import { useState } from "react";
import {
  Sparkles,
  Copy,
  RotateCcw,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";
import { useToast } from "../context/ToastContext";
import { getUserHistory, saveUserHistory } from "../utils/historyUtils";

function AIContent() {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("Blog Post");
  const [result, setResult] = useState("");
  const { showToast, showPopup } = useToast();


  const handleGenerate = () => {
    if (!prompt.trim()) {
      showToast("Please enter your instructions first.", "warning");
      return;
    }

    const generatedResult =
      "Your content preview will appear here once AI API integration is connected. Your prompt: " +
      prompt;

    setResult(generatedResult);

    const historyItem = {
      id: Date.now(),
      type: "content",
      title: contentType,
      prompt: prompt,
      content: generatedResult,
      createdAt: new Date().toISOString(),
    };

    const existingHistory = getUserHistory();

    existingHistory.unshift(historyItem);

    saveUserHistory(existingHistory);

    showToast("Content preview generated successfully.", "success");
  };

  const handleClearPreview = () => {
    showPopup({
      title: "Clear Preview?",
      message: "Are you sure you want to clear the generated content preview?",
      type: "warning",
      confirmText: "Clear Preview",
      cancelText: "Cancel",

      onConfirm: () => {
        setResult("");
        showToast("Content preview cleared successfully.", "success");
      },
    });
  };

  const handleClearInstructions = () => {
    if (!prompt.trim()) {
      showToast(
        "There are no instructions to clear.",
        "warning"
      );
      return;
    }

    showPopup({
      title: "Clear Instructions?",
      message: "Are you sure you want to clear the instructions you entered?",
      type: "warning",
      confirmText: "Clear Instructions",
      cancelText: "Cancel",

      onConfirm: () => {
        setPrompt("");
        showToast("Instructions cleared successfully.", "success");
      },
    });
  };
  const handleCopyInstructions = async () => {
    if (!prompt.trim()) {
      showToast("Please enter your instructions before copying.", "warning");
      return;
    }

    try {
      await navigator.clipboard.writeText(prompt);
      showToast("Instructions copied successfully.", "success");
    } catch {
      showToast("Unable to copy instructions. Please try again.", "error");
    }
  };


  const handleCopyPreview = async () => {
    if (!result.trim()) return;

    try {
      await navigator.clipboard.writeText(result);
      showToast("Content preview copied successfully.", "success");
    } catch {
      showToast("Unable to copy preview. Please try again.", "error");
    }
  };


  return (
    <main className="dashboard-page">
      <DashboardSidebar />

      <section className="dashboard-main">
        <div className="ai-content-page">
          <div className="ai-content-header">
            <span>
              <Sparkles size={16} /> AI PRODUCTIVITY TOOL
            </span>

            <h1>AI Content Generator</h1>
            <span className="demo-mode-badge">Demo Mode</span>
            <p>
              Create content ideas and drafts from your instructions.
            </p>
          </div>

          <div className="ai-content-panel">
            <label htmlFor="content-type">Content Type</label>

            <select
              id="content-type"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              <option>Blog Post</option>
              <option>Social Media Post</option>
              <option>Product Description</option>
              <option>Email</option>
            </select>

            <label htmlFor="content-prompt">
              Your Instructions
            </label>

            <textarea
              id="content-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the content you want to create..."
              rows={6}
            />

            <div className="ai-input-actions">
              <div className="ai-primary-actions">
                <button
                  className="ai-generate-button"
                  onClick={handleGenerate}
                >
                  <Sparkles size={18} />
                  Generate Preview
                </button>

                <button
                  className="ai-copy-instructions-button"
                  onClick={handleCopyInstructions}
                >
                  <Copy size={16} />
                  Copy Instructions
                </button>
              </div>

              <button
                type="button"
                className="ai-clear-button ai-clear-instructions-button"
                onClick={handleClearInstructions}
              >
                <RotateCcw size={16} />
                Clear Instructions
              </button>
            </div>
          </div>

          {result && (
            <div className="ai-result-panel">
              <div className="ai-result-heading">
                <h2>Content Preview</h2>
              </div>

              <p>
                <strong>Type:</strong> {contentType}
              </p>

              <p>{result}</p>

              <div className="ai-result-actions">

                <button
                  onClick={handleCopyPreview}
                  className="ai-copy-button"
                >
                  <Copy size={16} />
                  Copy Preview
                </button>


                <button
                  onClick={handleClearPreview}
                  className="ai-clear-button"
                >
                  <RotateCcw size={16} />
                  Clear Preview
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default AIContent;




