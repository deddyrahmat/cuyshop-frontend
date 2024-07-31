import React from "react";
import Table from "../Table";

interface TabContentProps {
  activeTab: string;
  data: Record<string, string>[];
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, data }) => {
  const tabComponents: Record<string, React.ReactNode> = {
    Pending: <Table data={data} />,
    Process: <h1>Test Dashboard</h1>,
    Success: <h1>Success</h1>,
    // Tambahkan tab dan komponen lain di sini
  };

  return (
    <section className="mt-8">
      {tabComponents[activeTab] || <section>Content not available</section>}
    </section>
  );
};

export default TabContent;
