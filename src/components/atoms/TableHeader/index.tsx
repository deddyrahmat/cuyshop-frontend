import React from "react";

interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className="py-2 px-4 bg-gray-200 font-bold border text-left"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
