import { useState, useRef } from "react";
import { FileText, Copy, RotateCcw } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth/mammoth.browser";
import DashboardSidebar from "../components/DashboardSidebar";
import { useToast } from "../context/ToastContext";
import { getUserHistory, saveUserHistory } from "../utils/historyUtils";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function DocumentSummary() {
  const [documentText, setDocumentText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState("Medium");
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const { showToast, showPopup } = useToast();

  const fileInputRef = useRef(null);

  // Handle document upload
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadError("");
    setUploadSuccess("");

    const fileName = file.name.toLowerCase();

    const allowedExtensions = [".txt", ".pdf", ".docx"];

    const isAllowed = allowedExtensions.some((extension) =>
      fileName.endsWith(extension)
    );

    if (!isAllowed) {
      showToast(
        "Unsupported file format. Please upload a TXT, PDF, or DOCX file.",
        "error"
      );
      event.target.value = "";
      return;
    }

    if (file.size === 0) {
      showToast("This file is empty. Please choose another file.", "error");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast("File size exceeds 10 MB. Please choose a smaller file.", "error");
      event.target.value = "";
      return;
    }

    try {
      let extractedText = "";

      // Extract TXT
      if (fileName.endsWith(".txt")) {
        extractedText = await file.text();
      }

      // Extract PDF
      else if (fileName.endsWith(".pdf")) {
        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(await file.arrayBuffer()),
        }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          extractedText +=
            content.items
              .filter((item) => "str" in item)
              .map((item) => item.str)
              .join(" ") + "\n\n";
        }
      }

      // Extract DOCX
      else if (fileName.endsWith(".docx")) {
        const result = await mammoth.extractRawText({
          arrayBuffer: await file.arrayBuffer(),
        });

        extractedText = result.value;
      }

      if (!extractedText.trim()) {
        showToast(
          "No readable text found in this file. Please try another document.",
          "error"
        );
        event.target.value = "";
        return;
      }

      setDocumentText(extractedText);
      setSummary("");
      showToast(
        "Document uploaded and text extracted successfully!",
        "success"
      );
    } catch (error) {
      console.error("File upload error:", error);

      showToast(
        "Unable to read this file. Please try another document.",
        "error"
      );
    }

    event.target.value = "";
  };

  // Word and character count
  const wordCount = documentText.trim()
    ? documentText.trim().split(/\s+/).length
    : 0;

  const characterCount = documentText.length;

  // Create summary preview

  // Create summary preview
  const handleSummarize = () => {
    if (!documentText.trim()) {
      showToast("Please enter or upload a document first.", "warning");
      return;
    }

    setUploadError("");

    const generatedSummary =
      "Summary preview: AI summarization will be connected through an API later.\n\n" +
      "Selected length: " +
      summaryLength +
      "\n\nYour document contains " +
      wordCount +
      " words and " +
      characterCount +
      " characters.";

    setSummary(generatedSummary);

    const historyItem = {
      id: Date.now(),
      type: "document",
      title: "Document Summary",
      content: generatedSummary,
      wordCount: wordCount,
      characterCount: characterCount,
      summaryLength: summaryLength,
      createdAt: new Date().toISOString(),
    };

    const existingHistory = getUserHistory();

    existingHistory.unshift(historyItem);

    saveUserHistory(existingHistory);
    showToast("Summary preview created successfully.", "success");
  };
  // Copy text

  const handleCopy = async (text, label) => {
    if (!text.trim()) {
      showToast("There is no text available to copy.", "warning");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied successfully.`, "success");
    } catch (error) {
      console.error("Copy error:", error);
      showToast(`Unable to copy ${label.toLowerCase()}. Please try again.`, "error");
    }
  };


  // Clear document

  const handleClear = () => {
    if (!documentText.trim() && !summary) {
      showToast(
        "There is no document or summary to clear.",
        "warning"
      );
      return;
    }

    showPopup({
      title: "Clear Document?",
      message: "Are you sure you want to clear the document and summary preview?",
      type: "warning",
      confirmText: "Clear Document",
      cancelText: "Cancel",
      onConfirm: () => {
        setDocumentText("");
        setSummary("");
        setSummaryLength("Medium");
        setUploadError("");
        setUploadSuccess("");

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        showToast(
          "Document and summary cleared successfully.",
          "success"
        );
      },
    });
  };

  // Download summary
  const handleDownload = () => {
    if (!summary) return;

    const blob = new Blob([summary], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "document-summary.txt";

    link.click();

    showToast("Your summary download has been started.", "success");

    URL.revokeObjectURL(url);
    URL.revokeObjectURL(url);
  };

  // Download original document
  const handleDownloadOriginal = () => {
    if (!documentText) return;

    const blob = new Blob([documentText], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "original-document.txt";
    link.click();

    showToast(
      "Your original document text download has started as a TXT file.",
      "success"
    );

    URL.revokeObjectURL(url);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="dashboard-page ai-content-page">
      <DashboardSidebar />

      <section className="dashboard-main">

        {/* Page Header */}
        <div className="ai-content-header">
          <span>
            <FileText size={16} /> DOCUMENT TOOL
          </span>

          <h1>Document Summarizer</h1>
          <span className="demo-mode-badge">Demo Mode</span>

          <p>
            Turn lengthy documents into shorter, easier-to-read content.
          </p>
        </div>

        {/* Document Input Panel */}
        <div className="ai-content-panel">

          <label htmlFor="summary-length">
            Summary Length
          </label>

          <select
            id="summary-length"
            value={summaryLength}
            onChange={(e) => setSummaryLength(e.target.value)}
          >
            <option value="Short">Short</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
          </select>

          <label htmlFor="document-file">
            Upload Document (TXT, PDF, DOCX)
          </label>

          <input
            type="file"
            id="document-file"
            ref={fileInputRef}
            accept=".txt,.pdf,.docx"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

          <label
            htmlFor="document-file"
            className="ai-upload-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              marginTop: "10px",
              backgroundColor: "#635bff",
              color: "#ffffff",
              borderRadius: "9px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <FileText size={18} />
            Choose File
          </label>

          {/* Upload Messages */}
          {uploadError && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginTop: "10px",
              }}
              role="alert"
            >
              {uploadError}
            </p>
          )}

          {uploadSuccess && (
            <p
              style={{
                color: "#16a34a",
                fontSize: "14px",
                marginTop: "10px",
              }}
              role="status"
            >
              {uploadSuccess}
            </p>
          )}

          {/* Document Textarea */}
          <label htmlFor="document-text">
            Enter Your Document
          </label>

          <textarea
            id="document-text"
            rows={10}
            value={documentText}
            onChange={(e) => {
              setDocumentText(e.target.value);
              setUploadError("");
              setUploadSuccess("");
              setSummary("");
            }}
            placeholder="Paste your document text here..."
          />

          {/* Document Statistics */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              marginTop: "8px",
              color: "var(--color-text)",
            }}
          >
            <span>Words: {wordCount}</span>
            <span>Characters: {characterCount}</span>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "22px",
            }}
          >
            <button
              type="button"
              className="ai-generate-button"
              onClick={handleSummarize}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#635bff",
                color: "#ffffff",
                padding: "13px 20px",
                border: "none",
                borderRadius: "9px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <FileText size={18} />
              Create Summary Preview
            </button>

            <button
              type="button"
              className="ai-copy-button"
              onClick={() => handleCopy(documentText, "Original document")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "13px 20px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "9px",
                cursor: "pointer",
                opacity: 1,
                transition: "all 0.2s ease",
              }}
            >
              <Copy size={16} />
              Copy Original Document
            </button>
          </div>

          {/* Clear Button */}
          <button
            type="button"
            className="ai-clear-button"
            onClick={handleClear}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "9px",
              marginTop: "15px",
              padding: "13px 20px",
              border: "1px solid var(--color-border)",
              borderRadius: "9px",
              background: "#ffffff",
              color: "#333333",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <RotateCcw size={16} />
            Clear Document
          </button>
        </div>

        {/* Summary Result Panel */}
        {summary && (
          <div className="ai-result-panel">

            <div className="ai-result-heading">
              <h2>Summary Preview</h2>


            </div>

            <p style={{ whiteSpace: "pre-wrap" }}>
              {summary}
            </p>
            <div className="ai-result-actions">
              {/* Copy Preview */}
              <button
                type="button"
                className="ai-copy-button"
                onClick={() => handleCopy(summary, "Summary preview")}
                style={{
                  display: "block",
                  backgroundColor: "#635bff",
                  color: "#ffffff",
                  padding: "13px 20px",
                  marginTop: "22px",
                  border: "none",
                  borderRadius: "9px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <Copy size={16} /> Copy Preview
              </button>

              <button
                type="button"
                className="ai-clear-button"
                onClick={() => {
                  showPopup({
                    title: "Clear Summary Preview?",
                    message: "Are you sure you want to clear the summary preview?",
                    type: "warning",
                    confirmText: "Clear Preview",
                    cancelText: "Cancel",
                    onConfirm: () => {
                      setSummary("");
                      showToast("Summary preview cleared successfully.", "success");
                    },
                  });
                }}
              >
                <RotateCcw size={16} />
                Clear Preview
              </button>
            </div>
            {/* Download Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <button
                type="button"
                className="ai-download-button"
                onClick={handleDownload}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#16a34a",
                  color: "#ffffff",
                  padding: "13px 20px",
                  border: "none",
                  borderRadius: "9px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Download Summary
              </button>

              <button
                type="button"
                className="ai-download-original-button"
                onClick={handleDownloadOriginal}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  padding: "13px 20px",
                  border: "none",
                  borderRadius: "9px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <FileText size={16} />
                Download Original Document
              </button>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}

export default DocumentSummary;
