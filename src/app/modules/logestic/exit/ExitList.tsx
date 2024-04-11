// import { useState } from "react";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { Link } from "react-router-dom";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
// import Pagination from "../../../../_cloner/components/Pagination";
import { useGetExitRemittanceList } from "../core/_hooks";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import { exitColumns } from "../../managment-order/helpers/columns";

// const pageSize = 20;

const ExitList = () => {
    // const [currentPage, setCurrentPage] = useState<number>(1);

    const exitRemittanceList = useGetExitRemittanceList();


    // useEffect(() => {
    //     let formData = {
    //         PageNumber: currentPage,
    //         PageSize: pageSize,
    //     };
    //     ladingList.mutate(formData);
     // eslint-disable-next-line
    // }, []);

    // const handleFilter = (values: any) => {
    //     let formData = {
    //         PageNumber: currentPage,
    //         PageSize: pageSize,
    //         OrderCode: values.orderCode ? values.orderCode : "",
    //         CustomerId: values.customerId ? values.customerId : "",
    //     };
    //     ladingList.mutate(formData);
    // }
    
    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/lading/${item?.row?.id}`}>
                <EditGridButton onClick={() => {}} />
            </Link>
        );
    };

    // const handlePageChange = (selectedItem: { selected: number }) => {
    //     setCurrentPage(selectedItem.selected + 1);
    // };

    return (
        <>
            <ReusableCard>
                <MuiDataGrid
                    columns={exitColumns(renderAction)}
                    rows={exitRemittanceList?.data?.data}
                    data={exitRemittanceList?.data?.data}
                    isLoading={exitRemittanceList?.isLoading}
                />
                {/* <Pagination
                    pageCount={ladingList?.data?.totalCount / pageSize}
                    onPageChange={handlePageChange}
                /> */}
            </ReusableCard>
        </>
    );
};

export default ExitList;
