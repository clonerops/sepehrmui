import { useMemo, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";

type Props = {
    columns: any;
    rows: any;
    onDoubleClick?: any;
    onCellEditCommit?: any;
    data: any;
    width?: number;
    height?: number;
    maxVisibleRows?: number;
    customRowStyle?: boolean;
    isLoading?: boolean;
    hideFooter?: boolean;
    getRowId?: any
};

const MuiDataGrid = (props: Props) => {
    const { columns, rows, isLoading, data, width, hideFooter=false, height, getRowId, maxVisibleRows = 12, customRowStyle, onDoubleClick, onCellEditCommit  } = props;

    const gridHeight = useMemo(() => {
        const numRows = data?.length;
        const defaultRowHeight = numRows  < 6 && numRows > 2 ? 76 : numRows < 2 ? 92 : 52;
        const headerHeight = 56;
        const scrollbarHeight = 0;
        if (!data || data.length === 0) {
            // Set a minimum height to display the header
            return 100; // Adjust this value as needed
        }
        const calculatedHeight =
            numRows * defaultRowHeight + headerHeight + scrollbarHeight;
        return calculatedHeight <= maxVisibleRows * defaultRowHeight
            ? calculatedHeight
            : maxVisibleRows * defaultRowHeight;
             // eslint-disable-next-line
    }, [data, maxVisibleRows]);

    const getRowClassName = useCallback((params: any) => {
        let className = params.indexRelativeToCurrentPage % 2 === 0 ? "bg-[#ECF5FF]" : "bg-white";

        if (customRowStyle) {
            className = "custom-row-style";
        }
        return className;
         // eslint-disable-next-line
    }, [])

    const uniqueData = rows?.map((row: any, index: number) => ({ ...row, uniqueId: `${row.id}${index}` }));
    const getRowIdFunc = (row: any) => row.uniqueId;

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
                rows={uniqueData ? uniqueData : []}
                columns={columns}
                getRowId={getRowId ? getRowId :getRowIdFunc}
                rowHeight={42}
                pageSize={data?.length}
                hideFooter={hideFooter} 
                onRowDoubleClick={onDoubleClick}
                
                getRowClassName={getRowClassName}
                loading={isLoading}
                columnHeaderHeight={32}
                onCellEditCommit={onCellEditCommit}
                localeText={{
                    noRowsLabel: "هیچ ردیفی موجود نیست",
                    MuiTablePagination: {
                      labelDisplayedRows: ({ from, to, count }) =>`${from} - ${to} تعداد کل: ${count}`,
                      labelRowsPerPage: "تعداد سطر قابل نمایش"
                        
                    },
                  }}
                style={{ height: height ? height : gridHeight, maxHeight: gridHeight, overflow: "hidden" }}
            />
        </div>
    );
}

export default MuiDataGrid