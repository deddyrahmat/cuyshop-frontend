import React, { useState } from "react";
import TabContent from "../TabContent";
import Tab from "../../molecules/Tab";
import Table from "../Table";

const PendingData = [
  { Name: "John Doe", Age: "30", Email: "john@example.com" },
  { Name: "Jane Smith", Age: "25", Email: "jane@example.com" },
  { Name: "Sam Green", Age: "35", Email: "sam@example.com" },
];

const OrderContent: React.FC = () => {
  const tabs = ["Pending", "Process", "Success"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const tabComponents = {
    Pending: <Table data={PendingData} />,
    Process: <h1>Processing Orders</h1>,
    Success: <h1>Successful Orders</h1>,
  };

  return (
    <section className="2xl:container 2xl:mx-auto py-5 px-2 2xl:px-8 bg-white min-h-[50vh]">
      <Tab tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <TabContent activeTab={activeTab} components={tabComponents} />
    </section>
  );
};

export default OrderContent;
