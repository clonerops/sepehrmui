import { useEffect } from "react";
import { Link } from "react-router-dom";
import {Button, Typography } from '@mui/material'

import { useGetAllRents } from "./core/_hooks";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { rentsColumns } from "./helpers/columns";
import { Formik } from "formik";
import FormikInput from "../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import { Search } from "@mui/icons-material";

const initialValues = {
    refrenceCode: "",
    driverName: "",
    fromDate: "",
    toDate: "",
    orderType: ""
}

const ReadyToRent = () => {
    
    const { mutate, data: rents, isLoading } = useGetAllRents();

    useEffect(() => {
        const formData = {}
        mutate(formData, {
            onSuccess: (response) => {
            }
        })
         // eslint-disable-next-line
    }, []);



    const renderAction = (item: any) => {
        return (
            <Link to="/dashboard/rentPayment">
                <Button variant="contained" color="secondary"> 
                    <Typography variant="h4" color="primary">اقدام به ثبت کرایه</Typography>
                </Button>
            </Link>
        );
    };


    const handleFilterBasedofStatus = (values: any) => {
        if(+values === -1) {
            const formData = {};
            mutate(formData, {
                onSuccess: (response) => {
                },
            });

        } else {
            const formData = {};
            mutate(formData, {
                onSuccess: (response) => {
                },
            });
        }
    };

    return (
        <ReusableCard>
            <div className="mb-4">
                <Formik initialValues={initialValues} onSubmit={() => { }}>
                    {() => {
                        return <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <FormikInput name='refrenceCode' label="شماره مرجع" />
                            <FormikInput name='driverName' label="نام راننده" />
                            <FormikSelect name='orderType' label="نوع سفارش" options={[{value: 1, label: "سفارش خرید"}, {value: 2, label: "سفارش فروش"}]} />
                            <FormikDatepicker name='fromDate' label="از تاریخ" />
                            <FormikDatepicker name='toDate' label="تا تاریخ" />
                            <ButtonComponent>
                                <Search className="text-white" />
                                <Typography className="text-white">جستجو</Typography>
                            </ButtonComponent>
                        </div>
                    }}
                </Formik>
            </div>
            <MuiDataGrid
                columns={rentsColumns(renderAction)}
                rows={rents?.data}
                data={rents?.data}
                isLoading={isLoading}
            />
        </ReusableCard>
    );
};

export default ReadyToRent;


