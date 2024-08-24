import React from "react";
import TableHeader from "../../atoms/TableHeader";
import TableBody from "../../molecules/TableBody";

interface TableProps {
  data: Record<string, React.ReactNode>[];
  showActionColumn?: boolean; // Menentukan apakah kolom Action harus ditampilkan
}

const Table: React.FC<TableProps> = ({ data, showActionColumn = true }) => {
  // Menentukan headers berdasarkan data dan apakah Action harus ditampilkan
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const modifiedHeaders = showActionColumn
    ? headers
    : headers.filter((header) => header !== "Action");

  return (
    <div className="relative overflow-x-auto rounded">
      <table className="w-full bg-white border-collapse">
        <TableHeader headers={modifiedHeaders} />
        <TableBody data={data} showActionColumn={showActionColumn} />
      </table>
    </div>
  );
};

export default Table;
