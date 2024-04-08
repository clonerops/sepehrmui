import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Formik } from "formik";
import { AddCircleOutline, AddTask, AdfScanner, DesignServices, TextDecrease } from "@mui/icons-material";
import * as Yup from "yup";

import FormikInput from "../../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import SwitchComponent from "../../../../_cloner/components/Switch";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../../_cloner/components/ReusableCard";

import { IBrand } from "./_models";
import { useGetBrands, usePostBrands, useUpdateBrands } from "./_hooks";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import Backdrop from "../../../../_cloner/components/Backdrop";
import CardWithIcons from "../../../../_cloner/components/CardWithIcons";
import _ from 'lodash'

const initialValues = {
    id: 0,
    name: "",
};

const validation = Yup.object({
    name: Yup.string().required("فیلد الزامی می باشد"),
});

const Brands = () => {
    const { data: brands, refetch, isLoading: brandLoading } = useGetBrands();
    const { mutate: postBrand, isLoading: postLoading } = usePostBrands();
    const { mutate: updateBrand, isLoading: updateLoading } = useUpdateBrands();
    // const { mutate: deleteBrand } = useDeleteBrands();

    const [results, setResults] = useState<IBrand[]>([]);

    useEffect(() => {
        setResults(brands?.data);
    }, [brands?.data]);

    // const handleDelete = (id: number) => {
    //     if (id)
    //         deleteBrand(id, {
    //             onSuccess: (response) => {
    //                 if(response.succeeded) {
    //                     EnqueueSnackbar(response.message, "success")
    //                   } else {
    //                     EnqueueSnackbar(response.data.Message, "error")
    //                   }
    //                   refetch();
    //                         },
    //         });
    // };

    const onUpdateStatus = (rowData: any) => {
        try {
            const formData = {
                id: rowData.row.id,
                name: rowData.row.name,
                isActive: !rowData.row.isActive,
            };
            updateBrand(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
                    }
                    refetch()
                },
            });
        } catch (e) {
            return e;
        }
    };

    const columns = (renderSwitch: any) => {
        const col = [
            {
                field: "id",
                headerName: "کد برند",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerClassName:
                    "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "name",
                headerName: "نام برند",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerClassName: "headerClassName",
                flex: 1,
                minWidth: 160,
            },
            {
                field: "isActive",
                headerName: "وضعیت",
                renderCell: renderSwitch,
                headerClassName: "headerClassName",
                flex: 1,
                minWidth: 160,
            },
        ];
        return col;
    };

    const renderSwitch = (item: any) => {
        return (
            <SwitchComponent
                checked={item?.row.isActive}
                onChange={(_) => onUpdateStatus(item)}
            />
        );
    };
    // const renderAction = (item: any) => {
    //     return (
    //         <div  className="flex gap-4">
    //             <DeleteGridButton onClick={() => handleDelete(item?.row.id)} />
    //         </div>
    //     );
    // };

    if (brandLoading) {
        return <Backdrop loading={brandLoading} />;
    }

    return (
        <>
            {postLoading && <Backdrop loading={postLoading} />}
            {updateLoading && <Backdrop loading={updateLoading} />}
            <div className="flex flex-row gap-x-4 mb-4">
                <CardWithIcons
                    title='تعداد برند های ثبت شده'
                    icon={<DesignServices className="text-white" />}
                    value={brands?.data?.length}
                    iconClassName='bg-[#3322D8]' />
                <CardWithIcons
                    title='تعداد سرویس ها در وضعیت فعال'
                    icon={<AddTask className="text-white" />}
                    value={_.filter(brands?.data, 'isActive').length}
                    iconClassName='bg-[#369BFD]' />
                <CardWithIcons
                    title='تعداد سرویس ها در وضعیت غیرفعال'
                    icon={<TextDecrease className="text-white" />}
                    value={_.filter(brands?.data, (item) => !item.isActive).length}
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
                                    postBrand(formData, {
                                        onSuccess: (response) => {
                                            if (response.succeeded) {
                                                EnqueueSnackbar(response.message, "success")
                                                setFieldValue('id', response.data.id)
                                                refetch();
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
                                        <div
                                            
                                            className="md:flex md:justify-start md:items-start gap-x-4"
                                        >
                                            <FormikInput
                                                name="id"
                                                label="کد برند"
                                                disabled={true}
                                                boxClassName="mt-2 md:mt-0"
                                            />
                                            <FormikInput
                                                name="name"
                                                label="نام برند"
                                                boxClassName="mt-2 md:mt-0"
                                                autoFocus={true}
                                            />
                                            <div  className="mt-2 md:mt-0">
                                                <ButtonComponent
                                                    onClick={() => handleSubmit()}
                                                >
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
                                data={brands?.data}
                                threshold={0.5}
                                setResults={setResults}
                            />
                        </div>
                        <MuiDataGrid
                            columns={columns(renderSwitch)}
                            rows={results}
                            data={brands?.data}
                        />

                    </div>
                </ReusableCard>
                <ReusableCard cardClassName="hidden md:flex md:justify-center md:items-center">
                    <div>
                        <img
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
