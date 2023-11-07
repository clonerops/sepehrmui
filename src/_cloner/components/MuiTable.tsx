// Table.tsx

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface TableColumn {
  header: string;
  accessor: string;
  render?: (rowData: any) => React.ReactNode;
}

interface TableProps {
  data: any[]; // Your data array
  columns: TableColumn[];
  onDoubleClick?: any
  headClassName: string;
  headCellTextColor?: string;
}

const MuiTable: React.FC<TableProps> = ({ data, columns, onDoubleClick, headClassName="bg-[#E2E8F0]", headCellTextColor= "text-black" }) => {
    return (
      <TableContainer component={Paper}>
        <Table >
          <TableHead className={headClassName} >
            <TableRow >
              {columns?.map((column) => (
                <TableCell  className={`${headCellTextColor} !font-bold !m-0 !py-1 !px-4`} key={column.accessor}>{column.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow key={rowIndex} onDoubleClick={() => onDoubleClick(row, rowIndex)} className='cursor-pointer'>
                {columns.map((column) => (
                  <TableCell key={column.accessor}>
                    <Typography variant="h4">{column.render ? column.render(row) : row[column.accessor]}</Typography>
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
