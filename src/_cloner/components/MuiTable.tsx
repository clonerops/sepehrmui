// Table.tsx

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface TableColumn {
  header: string;
  accessor: string;
  render?: (rowData: any) => React.ReactNode;
}

interface TableProps {
  data: any[]; // Your data array
  columns: TableColumn[];
}

const MuiTable: React.FC<TableProps> = ({ data, columns }) => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead className='bg-[#E2E8F0]'>
            <TableRow>
              {columns?.map((column) => (
                <TableCell className='!text-black font-bold' key={column.accessor}>{column.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.accessor}>
                    {column.render ? column.render(row) : row[column.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  

export default MuiTable;
