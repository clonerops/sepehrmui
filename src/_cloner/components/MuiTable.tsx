// Table.tsx

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Paper, Typography } from '@mui/material';

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
  tooltipTitle?: React.ReactNode;
}

const MuiTable: React.FC<TableProps> = ({ data, columns, tooltipTitle, onDoubleClick, headClassName = "bg-[#E2E8F0]", headCellTextColor = "text-black" }) => {
  return (
    <TableContainer component={Paper}>
      <Table >
        <TableHead className={headClassName} >
          <TableRow >
            {columns?.map((column) => (
              <TableCell className={`${headCellTextColor} !font-bold !m-0 !py-1 !px-4`} key={column.accessor}>{column.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, rowIndex) => (
            <Tooltip title={tooltipTitle}>
              <TableRow key={rowIndex} onDoubleClick={() => onDoubleClick(row, rowIndex)} className='cursor-pointer hover:bg-blue-200 transition'>
                {columns.map((column) => (
                  <TableCell key={column.accessor}>
                    <Typography variant="h4">{column.render ? column.render(row) : row[column.accessor]}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default MuiTable;
