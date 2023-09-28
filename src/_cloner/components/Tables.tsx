// ReusableTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export interface TableColumn {
  key: string;
  title: string;
}

interface Props {
  columns: TableColumn[];
  data: any[];
  isLoading: boolean;
  isError: boolean;
  renderActions: (item: any) => React.ReactNode;
}

const ReusableTable: React.FC<Props> = ({
  columns,
  data,
  isLoading,
  isError,
  renderActions,
}) => {
  const getValueFromNestedKey = (item: any, key: string) => {
    const keys = key.split(".");
    let value = item;

    for (const nestedKey of keys) {
      if (value && value.hasOwnProperty(nestedKey)) {
        value = value[nestedKey];
      } else {
        return null;
      }
    }
    return value;
  };

  {
    isLoading && <div>Loading ...</div>;
  }
  {
    isError && <div>there is a problem!</div>;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead className="bg-slate-200">
          <TableRow>
            {columns?.map((column) => (
              <TableCell className="font-poppins_bold" key={column.key}>
                {column.title}
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              {columns?.map((column) => (
                <TableCell key={column.key}>
                  {getValueFromNestedKey(item, column.key)}
                </TableCell>
              ))}
              <TableCell>{renderActions(item)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
