import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

type Props = {
    columns: any
    rows: any
    data: any
}

export default function MuiDataGrid(props: Props) {
    const { columns, rows, data } = props;
    return (
        <Box sx={{ height: 400, width: '100%', marginTop: 1 }}>
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