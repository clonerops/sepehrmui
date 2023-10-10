import { DataGrid } from "@mui/x-data-grid";
import { StringDecoder } from "string_decoder";

type Props = {
    columns: {
        field: string;
        headerName: string;
    }[];
    rows: any;
    data: any;
    selectionModel: any;
    setSelectionModel: any;
    onRowDoubleClick?: any;
    pagination?: any;
    hideFooter?: boolean;
    className?: string
    columnHeaderHeight?: number;
    getRowId?: any
};

export default function MuiSelectionDataGrid(props: Props) {
    const { rows, columns, onRowDoubleClick, pagination, getRowId, hideFooter, className, columnHeaderHeight } = props;
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows || []}
                className={className}
                columnHeaderHeight={columnHeaderHeight}
                columns={columns}
                getRowId={getRowId}
                onRowDoubleClick={onRowDoubleClick}
                pagination={pagination}
                hideFooter={hideFooter}
                localeText={{ noRowsLabel: "داده ای برای نمایش وجود ندارد" }}
            />
        </div>
    );
}
