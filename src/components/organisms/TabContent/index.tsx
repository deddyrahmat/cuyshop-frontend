import React from "react";
import Table from "../Table";

interface TabContentProps {
  activeTab: string;
  components: Record<string, React.ReactNode>;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, components }) => {
  return (
    <section className="mt-8">
      {components[activeTab] ?? <section>Content not available</section>}
    </section>
  );
};

export default TabContent;
