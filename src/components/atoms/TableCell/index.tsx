import React from "react";

interface TableCellProps {
  content: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ content }) => {
  return <td className="py-2 px-4 border">{content}</td>;
};

export default TableCell;
