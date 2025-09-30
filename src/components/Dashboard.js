import { useState } from "react";
import Sidebar from "./Sidebar";
import Analytics from "./Analytics";
import Index from "./Index";
import Integration from "./Integration";
import ChatBot from "./ChatBot";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("index");

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return <Analytics />;
      case "index":
        return <Index />;
      case "integration":
        return <Integration />;
      default:
        return <Index />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="dashboard-content">
        {renderContent()}
      </main>
      <ChatBot />
    </div>
  );
}