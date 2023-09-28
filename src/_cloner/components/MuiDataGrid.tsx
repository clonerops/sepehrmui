import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';

type Props = {
    columns: any
    rows: any
    data: any
}

export default function MuiDataGrid(props: Props) {
    const { columns, rows, data } = props;
    return (
        <Box sx={{ height: 400, width: '100%', marginTop: 4 }}>
            <DataGrid
                {...data}
                rows={rows ? rows : []}
                columns={columns}
                pagination
                initialState={{
                    ...data?.initialState,
                    pagination: { paginationModel: { pageSize: 2 } },
                }}
            />
        </Box>
    );
}