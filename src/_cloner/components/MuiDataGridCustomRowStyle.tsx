import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";

type Props = {
    columns: any;
    rows: any;
    onDoubleClick?: any;
    data: any;
    width?: number;
    maxVisibleRows?: number;
    getRowClassName?: any;
    columnTypes?: any;
};

export default function MuiDataGridCustomRowStyle(props: Props) {
    const { columns, rows, data, width, maxVisibleRows = 12, getRowClassName, columnTypes } = props;

    const gridHeight = useMemo(() => {
        const numRows = data?.length;
        const defaultRowHeight = numRows < 6 ? 76 : 52;
        const headerHeight = numRows > 0 ? 8 : 16; // Adjust headerHeight based on the number of rows
        const scrollbarHeight = 15;
    
        const calculatedHeight =
            numRows * defaultRowHeight + headerHeight + scrollbarHeight;
        return calculatedHeight <= maxVisibleRows * defaultRowHeight
            ? calculatedHeight
            : maxVisibleRows * defaultRowHeight;
    }, [data, maxVisibleRows]);

    return (
        <div style={{ width: width }}>
            <DataGrid
                {...data}
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
                rows={rows ? rows : []}
                columns={columns}
                columnTypes={columnTypes}
                localeText={{ noRowsLabel: "داده ای برای نمایش وجود ندارد" }}
                getRowId={(row) => `${row.id}_${row.warehouseName}_${row.productBrandName}`}
                rowHeight={42}
                autoPageSize={false}
                onRowDoubleClick={props.onDoubleClick}
                getRowClassName={getRowClassName}
                hideFooter={true}
                hideFooterPagination={true}
                hideFooterSelectedRowCount={true}
                columnHeaderHeight={32}
                disableVirtualization={true}
                style={{ height: gridHeight, maxHeight: 400, overflow: "auto" }} // Set a max height and allow scrolling
            />
        </div>
    );
}
