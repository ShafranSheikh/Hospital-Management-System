import React, { useState } from 'react';
import './tabs.css'
const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0); // To track the active tab

  return (
    <div>
      {/* Tab Headers */}
      <div className="tab-headers">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
