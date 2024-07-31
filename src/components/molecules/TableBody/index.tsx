import React from "react";
import TableRow from "../../atoms/TableRow";

interface TableBodyProps {
  data: Record<string, string>[];
}

const TableBody: React.FC<TableBodyProps> = ({ data }) => {
  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow key={index} rowData={row} />
      ))}
    </tbody>
  );
};

export default TableBody;
