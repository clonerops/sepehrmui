import { useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "./Backdrop";

type Props = {
    columns: any;
    rows: any;
    onDoubleClick?: any;
    onCellEditCommit?: any;
    data: any;
    width?: number;
    maxVisibleRows?: number;
    customRowStyle?: boolean;
    isLoading?: boolean;
};

const MuiDataGrid = (props: Props) => {
    const { columns, rows, isLoading, data, width, maxVisibleRows = 12, customRowStyle, onDoubleClick, onCellEditCommit  } = props;

    const gridHeight = useMemo(() => {
        const numRows = data?.length;
        const defaultRowHeight = 52;
        const headerHeight = 56;
        const scrollbarHeight = 0;

        const calculatedHeight =
            numRows * defaultRowHeight + headerHeight + scrollbarHeight;
        return calculatedHeight <= maxVisibleRows * defaultRowHeight
            ? calculatedHeight
            : maxVisibleRows * defaultRowHeight;
    }, [data, maxVisibleRows]);

    const getRowClassName = useCallback((params: any) => {
        let className = params.indexRelativeToCurrentPage % 2 === 0 ? "bg-[#ECF5FF]" : "bg-white";

        if (customRowStyle) {
            className = "custom-row-style";
        }
        return className;
    }, [])

    if(isLoading) {
        return <Backdrop loading={isLoading} />
    }

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
                getRowId={(row) => `${row.id}_${row.warehouseName}_${row.productBrandName}_${row.applicationMenuId}`}
                rowHeight={42}
                autoPageSize={false}
                onRowDoubleClick={onDoubleClick}
                getRowClassName={getRowClassName}
                hideFooter={true}
                columnHeaderHeight={32}
                onCellEditCommit={onCellEditCommit}
                disableVirtualization={false}
                style={{ height: gridHeight, maxHeight: gridHeight, overflow: "auto" }} // Set a max height and allow scrolling
            />
        </Box>
    );
}

export default MuiDataGrid