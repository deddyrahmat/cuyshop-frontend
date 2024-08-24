import React from "react";
import TableRow from "../../atoms/TableRow";

interface TableBodyProps {
  data: Record<string, React.ReactNode>[];
  showActionColumn?: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({
  data,
  showActionColumn = true,
}) => {
  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow
          key={index}
          rowData={row}
          showActionColumn={showActionColumn}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
