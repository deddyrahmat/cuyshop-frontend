import React from "react";

interface TableRowProps {
  rowData: Record<string, React.ReactNode | string>; // Fleksibel untuk ReactNode dan string
  showActionColumn?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  rowData,
  showActionColumn = true,
}) => {
  return (
    <tr>
      {Object.keys(rowData).map((key) =>
        showActionColumn || key !== "Action" ? (
          <td key={key} className="py-2 px-6 border capitalize">
            {rowData[key]}
          </td>
        ) : null
      )}
    </tr>
  );
};

export default TableRow;
