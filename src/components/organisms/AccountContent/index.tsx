import React, { useState } from "react";
import TabContent from "../TabContent";
import Tab from "../../molecules/Tab";
import Table from "../Table";
import AddressAccount from "../AddressAccount/index";

const ProfileData = [
  { Name: "John Doe", Age: "30", Email: "john@example.com" },
  { Name: "Jane Smith", Age: "25", Email: "jane@example.com" },
  { Name: "Sam Green", Age: "35", Email: "sam@example.com" },
];

const AccountContent: React.FC = () => {
  const tabs = ["Profile", "Alamat"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const tabComponents = {
    Profile: <Table data={ProfileData} />,
    Alamat: <AddressAccount />,
  };

  return (
    <section className="2xl:container 2xl:mx-auto py-5 px-2 2xl:px-8 bg-white min-h-[50vh]">
      <Tab tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <TabContent activeTab={activeTab} components={tabComponents} />
    </section>
  );
};

export default AccountContent;
