import { useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

type Props = {
    columns: any;
    rows: any;
    onDoubleClick?: any;
    data: any;
    width?: number;
    maxVisibleRows?: number; // Add a new prop to control the maximum visible rows
};

export default function MuiDataGrid(props: Props) {
    const { columns, rows, data, width, maxVisibleRows = 12 } = props;

    const gridHeight = useMemo(() => {
        const numRows = data?.length;
        const defaultRowHeight = 52;
        const headerHeight = 56;
        const scrollbarHeight = 15;

        const calculatedHeight =
            numRows * defaultRowHeight + headerHeight + scrollbarHeight;
        return calculatedHeight <= maxVisibleRows * defaultRowHeight
            ? calculatedHeight
            : maxVisibleRows * defaultRowHeight;
    }, [data, maxVisibleRows]);

    return (
        <Box sx={{ width: width }}>
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
                pagination={false}
                getRowId={(row) => row.id + row.productBrandName + row.inventory + row.warehouseName}
                rowHeight={42}
                autoPageSize={false}
                onRowDoubleClick={props.onDoubleClick}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0
                        ? "bg-[#ECF5FF]"
                        : "bg-white"
                }
                // autoHeight={true}
                hideFooter={true}
                columnHeaderHeight={32}
                disableVirtualization={true}
                style={{ height: gridHeight, maxHeight: 400, overflow: "auto" }} // Set a max height and allow scrolling
            />
        </Box>
    );
}
