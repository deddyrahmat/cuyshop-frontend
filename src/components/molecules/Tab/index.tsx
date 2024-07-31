import React from "react";
import Button from "../../atoms/Button";

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <section className="flex  text-sm font-medium text-center gap-5">
      {tabs.map((tab) => (
        <Button
          key={tab}
          className={`${tab === activeTab ? "active" : ""}`}
          statusButton={tab === activeTab ? "primary" : "gray"}
          type="button"
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </Button>
      ))}
    </section>
  );
};

export default Tab;
