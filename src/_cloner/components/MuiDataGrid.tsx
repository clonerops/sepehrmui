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


    return (
        <Box sx={{ height: gridHeight, maxHeight: 1280, width: '100%', marginTop: 1 }}>
            <DataGrid
                {...data}
                rows={rows ? rows : []}
                columns={columns}
                getRowId={(row) => row.id+row.rowId}
                pagination={false}
                hideFooter={true}
            />
        </Box>
    );
}