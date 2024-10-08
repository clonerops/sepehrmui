import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Formik } from "formik";
import { AddCircleOutline, AddTask, AdfScanner, DesignServices, TextDecrease } from "@mui/icons-material";
import * as Yup from "yup";
import _ from 'lodash'

import FormikInput from "../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import SwitchComponent from "../../../_cloner/components/Switch";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import Backdrop from "../../../_cloner/components/Backdrop";
import CardWithIcons from "../../../_cloner/components/CardWithIcons";

import { IBrand } from "./_models";
import { useGetBrands, usePostBrands, useUpdateBrands } from "./_hooks";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";
import { BrandsColumn } from "../../../_cloner/helpers/columns";

const initialValues = {
    id: 0,
    name: "",
};

const validation = Yup.object({
    name: Yup.string().required("فیلد الزامی می باشد"),
});

const Brands = () => {
    const brandTools = useGetBrands()
    const postBrandTools = usePostBrands()
    const updateBrandTools = useUpdateBrands()

    const [results, setResults] = useState<IBrand[]>([]);

    useEffect(() => {
        setResults(brandTools?.data?.data);
         // eslint-disable-next-line
    }, [brandTools?.data?.data]);

    const onUpdateStatus = (rowData: any) => {
        try {
            const formData = {
                id: rowData.row.id,
                name: rowData.row.name,
                isActive: !rowData.row.isActive,
            };
            updateBrandTools.mutate(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
                    }
                    brandTools.refetch()
                },
            });
        } catch (e) {
            return e;
        }
    };

    const renderSwitch = (item: any) => {
        return (
            <SwitchComponent
                checked={item?.row.isActive}
                onChange={(_) => onUpdateStatus(item)}
            />
        );
    };


    return (
        <>
            {brandTools.isLoading && <Backdrop loading={brandTools.isLoading} />}
            {postBrandTools.isLoading && <Backdrop loading={postBrandTools.isLoading} />}
            {updateBrandTools.isLoading && <Backdrop loading={updateBrandTools.isLoading} />}
            
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <CardWithIcons
                    title='تعداد برند های ثبت شده'
                    icon={<DesignServices className="text-white" />}
                    value={brandTools?.data?.data?.length}
                    iconClassName='bg-[#3322D8]' />
                <CardWithIcons
                    title='تعداد سرویس ها در وضعیت فعال'
                    icon={<AddTask className="text-white" />}
                    value={_.filter(brandTools?.data?.data, 'isActive').length}
                    iconClassName='bg-[#369BFD]' />
                <CardWithIcons
                    title='تعداد سرویس ها در وضعیت غیرفعال'
                    icon={<TextDecrease className="text-white" />}
                    value={_.filter(brandTools?.data?.data, (item) => !item.isActive).length}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='تعداد سرویس های ثبت امروز'
                    icon={<AdfScanner className="text-white" />}
                    value={0}
                    iconClassName='bg-[#EB5553]' />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ReusableCard>
                    <div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validation}
                            onSubmit={async (
                                values,
                                { setStatus, setSubmitting, setFieldValue }
                            ) => {
                                try {
                                    const formData = {
                                        name: values.name,
                                    };
                                    postBrandTools.mutate(formData, {
                                        onSuccess: (response) => {
                                            if (response.succeeded) {
                                                EnqueueSnackbar(response.message, "success")
                                                setFieldValue('id', response.data.id)
                                                brandTools.refetch();
                                            } else {
                                                EnqueueSnackbar(response.data.Message, "warning")
                                            }
                                        },
                                    });
                                } catch (error) {
                                    setStatus("اطلاعات ثبت برند نادرست می باشد");
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ handleSubmit }) => {
                                return (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mb-4"
                                    >
                                        <div className="md:flex md:justify-start md:items-start gap-x-4">
                                            <FormikInput name="id" label="کد برند" disabled={true} boxClassName="mt-2 md:mt-0"/>
                                            <FormikInput name="name" label="نام برند" boxClassName="mt-2 md:mt-0" autoFocus={true}/>
                                            <div className="mt-2 md:mt-0">
                                                <ButtonComponent>
                                                    <Typography className="px-2">
                                                        <AddCircleOutline />
                                                    </Typography>
                                                </ButtonComponent>
                                            </div>
                                        </div>
                                    </form>
                                );
                            }}
                        </Formik>
                        <div className="mb-4">
                            <FuzzySearch
                                keys={["id", "name"]}
                                data={brandTools?.data?.data}
                                threshold={0.5}
                                setResults={setResults}
                            />
                        </div>
                        <MuiDataGrid
                            columns={BrandsColumn(renderSwitch)}
                            rows={results}
                            data={brandTools?.data?.data}
                            onDoubleClick={(item: any) => onUpdateStatus(item)}
                        />

                    </div>
                </ReusableCard>
                <ReusableCard cardClassName="hidden md:flex md:justify-center md:items-center">
                    <div>
                        <img alt="sepehriranian"
                            src={toAbsoulteUrl("/media/logos/8595513.jpg")}
                            width={400}
                        />
                    </div>
                </ReusableCard>
            </div>
        </>
    );
};

export default Brands;
