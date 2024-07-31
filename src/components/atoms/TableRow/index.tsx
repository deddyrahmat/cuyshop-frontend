import React from "react";
import TableCell from "../TableCell";

type TableRowData = Record<string, string>;

interface TableRowProps {
  rowData: TableRowData;
}

const TableRow: React.FC<TableRowProps> = ({ rowData }) => {
  return (
    <tr>
      {Object.keys(rowData).map((key, index) => (
        <TableCell key={index} content={rowData[key]} />
      ))}
    </tr>
  );
};

export default TableRow;
