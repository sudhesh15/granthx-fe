import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

const API_BASE = process.env.REACT_APP_API_BASE || "";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChat = async () => {
    if (!query.trim()) return;
    const q = query.trim();
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuery("");
    setLoading(true);
    
    try {
      const { data } = await axios.post(`${API_BASE}/api/chat`, { query: q });
      const ai = data?.response || "No response";
      setMessages((prev) => [...prev, { role: "ai", text: ai }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, I encountered an error while processing your question." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Open AI Assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4A2,2 0 0,1 4,2H20M4,4V18L6,16H20V4H4Z"/>
        </svg>
        )}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h4>GranthX AI Assistant</h4>
            <div className="chat-actions">
              <button className="btn-icon" onClick={clearChat} title="Clear chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"/>
                </svg>
            </button>
              <button className="btn-icon" onClick={() => setIsOpen(false)} title="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty">
                <h5>Welcome to GranthX AI Assistant</h5>
                <p>Ask me anything about your indexed content. I can help you find information, summarize documents, or answer specific questions.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.role === 'ai' ? (
                  <ReactMarkdown 
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      h1: ({children}) => <h1 className="markdown-h1">{children}</h1>,
                      h2: ({children}) => <h2 className="markdown-h2">{children}</h2>,
                      h3: ({children}) => <h3 className="markdown-h3">{children}</h3>,
                      p: ({children}) => <p className="markdown-p">{children}</p>,
                      ul: ({children}) => <ul className="markdown-ul">{children}</ul>,
                      ol: ({children}) => <ol className="markdown-ol">{children}</ol>,
                      li: ({children}) => <li className="markdown-li">{children}</li>,
                      strong: ({children}) => <strong className="markdown-strong">{children}</strong>,
                      code: ({children}) => <code className="markdown-code">{children}</code>,
                      pre: ({children}) => <pre className="markdown-pre">{children}</pre>,
                    }}
                  >
                    {m.text}
                  </ReactMarkdown>
                ) : (
                  <span>{m.text}</span>
                )}
              </div>
            ))}
            {loading && (
              <div className="chat-loading">
                <div className="loading-spinner"></div>
                GranthX is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about your indexed content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              disabled={loading}
            />
            <button onClick={handleChat} disabled={loading || !query.trim()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
