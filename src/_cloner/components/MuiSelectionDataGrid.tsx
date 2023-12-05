import { DataGrid } from "@mui/x-data-grid";

type Props = {
    columns: any;
    rows: any;
    data: any;
    selectionModel: any;
    setSelectionModel: any;
    onRowDoubleClick?: any;
    hideFooter?: boolean;
    className?: string
    columnHeaderHeight?: number;
    getRowId?: any
};

export default function MuiSelectionDataGrid(props: Props) {
    const { rows, columns, onRowDoubleClick, getRowId, hideFooter, className, columnHeaderHeight } = props;
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows || []}
                sx={{
                    ".MuiDataGrid-columnHeaderTitle": {
                        overflow: "visible !important",
                        fontFamily: "Yekan_medium",
                        color: "#464646",
                        fontSize: 13,
                    },
                    ".MuiDataGrid-row:hover": {
                        backgroundColor: "#B5F3FF",
                    },
                    overflowX: "scroll",
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0
                        ? "bg-[#ECF5FF]"
                        : "bg-white"
                }
                className={className}
                columnHeaderHeight={columnHeaderHeight}
                columns={columns}
                getRowId={getRowId}
                onRowDoubleClick={onRowDoubleClick}
                hideFooter={hideFooter}
                localeText={{ noRowsLabel: "داده ای برای نمایش وجود ندارد" }}
            />
        </div>
    );
}
