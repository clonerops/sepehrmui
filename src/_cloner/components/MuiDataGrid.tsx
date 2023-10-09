import { useMemo } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

type Props = {
    columns: any
    rows: any
    data: any
}

export default function MuiDataGrid(props: Props) {
    const { columns, rows, data } = props;


    const gridHeight = useMemo(() => {
        const numRows = data?.length;
        const defaultRowHeight = 52; // You can adjust this value
        const headerHeight = 56; // Header height
        const scrollbarHeight = 15; // Scrollbar height (adjust this value)
    
        // Calculate the height based on the number of rows and other elements
        return numRows * defaultRowHeight + headerHeight + scrollbarHeight;
      }, [data]);

    //   const getRowClassName = (params: any) => {
    //     return params.rowIndex % 2 === 0 ? 'bg-slat-100' : 'bg-red-500';
    //   };

    return (
        <Box sx={{ height: gridHeight, maxHeight: 400, width: '100%'}}>
            <DataGrid
                {...data}
                sx={{
                    '.MuiDataGrid-columnHeaderTitle': { 
                       fontWeight: 'bold !important',
                       overflow: 'visible !important'
                    }
                  }}                
                rows={rows ? rows : []}
                columns={columns}
                // getRowId={(row) => row.id+row.rowId}
                pagination={false}
                hideFooter={true}
                // getRowClassName={getRowClassName} // Add this prop
            />
        </Box>
    );
}