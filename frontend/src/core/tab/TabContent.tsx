import React, { useState } from 'react';

export interface Tab {
  title: string;
  content: React.ReactNode;
}

export interface TabContentProps {
  tabs: Tab[];
}

const TabContent: React.FC<TabContentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className="flex mb-4 space-x-2 justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-6 py-2 rounded-full min-w-44 ${
              index === activeTab
                ? 'bg-gradient-to-r from-primary-600 to-gray-800 text-white font-semibold'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(index)}>
            {tab.title}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabContent;
