import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography} from '@mui/material'

import {  useRetrieveOrdersByMutation } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { orderColumns } from "../helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import { Formik } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { Search } from "@mui/icons-material";

const pageSize = 100

const SalesOrderList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const orderLists = useRetrieveOrdersByMutation()

    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        const formData = {
            pageNumber: currentPage,
            pageSize: 100,        
        }
        orderLists.mutate(formData, {
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })
         // eslint-disable-next-line
    }, [currentPage]);


    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/sales_order/lists/${item?.row?.id}`}
                state={{ isConfirmed: false }}
            >
                <Button variant="contained" color="secondary"> 
                    <Typography variant="h4" color="primary">نمایش جزئیات</Typography>
                </Button>

            </Link>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const onSubmit = (values: any) => {
        const formData = values?.orderCode ? {
            pageNumber: currentPage,
            pageSize: 100,
            OrderCode: +values?.orderCode  
        } : {
            pageNumber: currentPage,
            pageSize: 100,
        }
        orderLists.mutate(formData, {
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })
    }
    
    return (
        <ReusableCard>
            <Formik initialValues={{orderCode: ""}} onSubmit={onSubmit}> 
                {({handleSubmit}) => {
                    return <div className="w-[50%] mb-4">
                        <div className="flex justify-center items-center gap-4">
                            <FormikInput name="orderCode" label="شماره سفارش"  />
                            <ButtonComponent onClick={handleSubmit}>
                                <Search className="text-white" />
                                <Typography className="text-white">جستجو</Typography>
                            </ButtonComponent>
                        </div>
                    </div>
                }}
            </Formik>
            <MuiDataGrid
                columns={orderColumns(renderAction)}
                rows={results}
                data={orderLists?.data?.data}
                isLoading={orderLists.isLoading}
            />
            <Pagination pageCount={+orderLists?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
        </ReusableCard>
    );
};

export default SalesOrderList;
