import { useState } from "react";

export default function Integration() {
  const [copiedApi, setCopiedApi] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const codeSnippet = `<!-- Load React & ReactDOM from CDN -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Load GranthX Chatbot -->
<script src="https://granthx.ai/widget/granthx-chat.umd.js"></script>

<!-- Place chat inside a div -->
<div id="granthx-chat"></div>`.trim();

  async function copy(text, which) {
    try {
      // Primary: async Clipboard API
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // Fallback: execCommand (works in more contexts / older browsers)
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } finally {
      if (which === "api") {
        setCopiedApi(true);
        setTimeout(() => setCopiedApi(false), 1500);
      } else {
        setCopiedSnippet(true);
        setTimeout(() => setCopiedSnippet(false), 1500);
      }
    }
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h1>Integration</h1>
        <p>Embed GranthX AI Assistant on your website. Copy the API endpoint or the chatbot UI snippet below.</p>
      </div>

      <div className="integration-section">
        <h3>API Endpoint</h3>
        <div className="integration-card">
          <code>https://granthx.ai/api/chat</code>
          <button
            type="button"
            onClick={() => copy("https://granthx.ai/api/chat", "api")}
            aria-label="Copy API endpoint"
          >
            {copiedApi ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="integration-section">
        <h3>Chatbot UI Snippet</h3>
        <div className="integration-card">
          <pre className="integration-pre">
            <code>{codeSnippet}</code>
          </pre>
          <button
            type="button"
            onClick={() => copy(codeSnippet, "snippet")}
            aria-label="Copy embed snippet"
          >
            {copiedSnippet ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
