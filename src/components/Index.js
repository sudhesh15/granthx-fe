import { useCallback, useMemo, useRef, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "";

export default function Index() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [indexing, setIndexing] = useState(false);
  const [sources, setSources] = useState([]);
  const dropRef = useRef(null);

  const fileLabel = useMemo(() => {
    if (!file) return "Choose a PDF/CSV or drop it here";
    return `${file.name} (${Math.round(file.size / 1024)} KB)`;
  }, [file]);

  const toast = (msg, type = "ok") => {
    const t = document.createElement("div");
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 3000);
  };

  // Upload PDF/CSV
  const handleFileUpload = async () => {
    if (!file) return toast("No file selected", "warn");
    setIndexing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post(`${API_BASE}/api/index/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSources((s) => [
        { type: "file", label: file.name, when: new Date().toISOString() },
        ...s,
      ]);
      setFile(null);
      toast("File indexed successfully");
    } catch (err) {
      console.error(err);
      toast(err?.response?.data?.error || "Upload failed", "err");
    } finally {
      setIndexing(false);
    }
  };

  // Add URL or Text
  const handleUrlOrText = async () => {
    if (!link && !text) return toast("Enter a URL or paste some text", "warn");
    setIndexing(true);
    try {
      const payload = { input: link || text };
      await axios.post(`${API_BASE}/api/index/url-or-text`, payload);

      setSources((s) => [
        {
          type: link ? "link" : "text",
          label: link || (text.length > 28 ? text.slice(0, 28) + "..." : text),
          when: new Date().toISOString(),
        },
        ...s,
      ]);
      setLink("");
      setText("");
      toast("Content indexed successfully");
    } catch (err) {
      console.error("Indexing failed:", err?.response?.data || err.message);
      toast(err?.response?.data?.error || "Indexing failed", "err");
    } finally {
      setIndexing(false);
    }
  };

  // Drag & Drop for files
  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    if (!/(\.pdf|\.csv)$/i.test(f.name)) {
      toast("Only .pdf or .csv files are allowed", "warn");
      return;
    }
    setFile(f);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current?.classList.add("drop-active");
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current?.classList.remove("drop-active");
  }, []);

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h1>Content Indexing</h1>
        <p>Upload files, add websites, or paste text to build your knowledge base.</p>
      </div>

      <div className="index-grid">
        {/* File Upload Panel */}
        <div className="panel">
          <h3 className="panel-title">
            <span className="panel-title-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </span>
            Upload Documents
          </h3>
          <div
            ref={dropRef}
            className="dropzone"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <input
              id="file"
              type="file"
              accept=".pdf,.csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ display: "none" }}
            />
            <label htmlFor="file" className="file-label">
              <div className="file-title">{fileLabel}</div>
              <div className="file-sub">PDF or CSV files supported</div>
            </label>
          </div>
          <button
            className="btn primary w-full"
            onClick={handleFileUpload}
            disabled={!file || indexing}
          >
            {indexing ? "Indexing..." : "Upload & Index"}
          </button>
        </div>

        {/* URL/Text Panel */}
        <div className="panel">
          <h3 className="panel-title">
            <span className="panel-title-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
            </span>
            Add Web Content
          </h3>
          <div className="field">
            <label className="label">Website or YouTube URL</label>
            <input
              className="input"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Or paste raw text</label>
            <textarea
              className="textarea"
              placeholder="Paste any text content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button
            className="btn secondary w-full"
            onClick={handleUrlOrText}
            disabled={indexing || (!link && !text)}
          >
            {indexing ? "Indexing..." : "Add Content"}
          </button>
        </div>
      </div>

      {/* Sources List */}
      <div className="panel sources-panel">
        <h3 className="panel-title">
          <span className="panel-title-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
            </svg>
          </span>
          Indexed Sources
        </h3>
        <div className="sources">
          {sources.length === 0 && (
            <div className="empty-sources">
              No sources indexed yet. Upload files or add URLs above to get started.
            </div>
          )}
          {sources.map((s, i) => (
            <div key={i} className="source-item">
              <span className={`badge ${s.type}`}>
                {s.type === "file" ? "DOC" : s.type === "link" ? "WEB" : "TXT"}
              </span>
              <span className="source-text" title={s.label}>
                {s.label}
              </span>
              <span className="source-time">
                {new Date(s.when).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}