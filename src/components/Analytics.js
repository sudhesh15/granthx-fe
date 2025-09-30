export default function Analytics() {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h1>Analytics</h1>
        <p>View insights and statistics about your indexed content and user interactions.</p>
      </div>
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </div>
        <h3>Analytics Coming Soon</h3>
        <p>Comprehensive analytics and insights will be available in the next update. Track usage patterns, popular queries, and content performance.</p>
      </div>
    </div>
  );
}