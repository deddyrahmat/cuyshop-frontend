import React from "react";
import TableHeader from "../../atoms/TableHeader";
import TableBody from "../../molecules/TableBody";

interface TableProps {
  data: Record<string, string>[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table className="min-w-full bg-white border-collapse">
      <TableHeader headers={headers} />
      <TableBody data={data} />
    </table>
  );
};

export default Table;
