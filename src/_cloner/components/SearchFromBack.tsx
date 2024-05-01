import { Search } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FC } from "react";
import { Formik } from "formik";

import FormikInput from "./FormikInput";
import ButtonComponent from "./ButtonComponent";

interface IProps {
    onSubmit: (values: any) => void
    initialValues: any
}

const SearchFromBack:FC<IProps> = ({onSubmit, initialValues}) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit} className="lg:w-[50%] mb-4">
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
                            <FormikInput name="orderCode" label="شماره سفارش" />
                            <ButtonComponent onClick={handleSubmit}>
                                <Search className="text-white" />
                                <Typography className="text-white">
                                    جستجو
                                </Typography>
                            </ButtonComponent>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};

export default SearchFromBack;
