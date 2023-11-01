import { useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

type Props = {
    columns: any;
    rows: any;
    onDoubleClick?: any;
    data: any;
    width?: number;
    maxVisibleRows?: number;
    customRowStyle?: boolean;
};

export default function MuiDataGrid(props: Props) {
    const { columns, rows, data, width, maxVisibleRows = 12, customRowStyle  } = props;

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

    const getRowClassName = (params: any) => {
        let className = params.indexRelativeToCurrentPage % 2 === 0 ? "bg-[#ECF5FF]" : "bg-white";

        if (customRowStyle) {
            className = "custom-row-style";
        }

        return className;
    };

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
                // getRowId={(row) => row.id}
                getRowId={(row) => `${row.id}_${row.warehouseName}_${row.productBrandName}`}
                rowHeight={42}
                autoPageSize={false}
                onRowDoubleClick={props.onDoubleClick}
                // getRowClassName={(params) =>
                //     params.indexRelativeToCurrentPage % 2 === 0
                //         ? "bg-[#ECF5FF]"
                //         : "bg-white"
                // }
                getRowClassName={getRowClassName}
                hideFooter={true}
                columnHeaderHeight={32}
                disableVirtualization={true}
                // style={{ height: gridHeight, maxHeight: 400, overflow: "auto" }} // Set a max height and allow scrolling
                style={{ height: gridHeight, maxHeight: gridHeight, overflow: "auto" }} // Set a max height and allow scrolling
            />
        </Box>
    );
}
