import { DataGrid } from '@mui/x-data-grid';

type Props = {
    columns: {
        field: string,
        headerName: string
    }[];
    rows: any;
    data: any;
    selectionModel: any;
    setSelectionModel: any;
    onRowDoubleClick: any;
};

export default function MuiSelectionDataGrid(props: Props) {
    const {  rows, columns, onRowDoubleClick, setSelectionModel } = props;
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows || []}
                columns={columns}
                onRowDoubleClick={onRowDoubleClick}
            />
        </div>
    );
}
