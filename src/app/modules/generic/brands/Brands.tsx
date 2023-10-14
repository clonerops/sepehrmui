import { useState, useEffect } from "react";
import { Box, Button, Card, Switch, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import { IBrand } from "./_models";
import {
    useDeleteBrands,
    useGetBrands,
    usePostBrands,
    useUpdateBrands,
} from "./_hooks";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import { AddCircleOutline } from "@mui/icons-material";
import * as Yup from "yup";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";

const initialValues = {
    id: 0,
    name: "",
};

const validation = Yup.object({
    name: Yup.string().required("فیلد الزامی می باشد"),
});

const Brands = () => {
    const { data: brands, refetch, isLoading: brandLoading } = useGetBrands();
    const { mutate: postBrand, data: postData } = usePostBrands();
    const { mutate: updateBrand, data: updateData } = useUpdateBrands();
    const { mutate: deleteBrand, data: deleteData } = useDeleteBrands();

    const [results, setResults] = useState<IBrand[]>([]);
    const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
    const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
    const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);

    useEffect(() => {
        setResults(brands?.data);
    }, [brands?.data]);

    const handleDelete = (id: number) => {
        if (id)
            deleteBrand(id, {
                onSuccess: (message) => {
                    setSnackeDeleteOpen(true);
                    refetch();
                },
            });
    };

    const onUpdateStatus = (rowData: any) => {
        try {
            const formData = {
                id: rowData.row.id,
                name: rowData.row.name,
                isActive: !rowData.row.isActive,
            };
            updateBrand(formData, {
                onSuccess: () => {
                    setSnackeUpdateOpen(true);
                    refetch();
                },
            });
        } catch (e) {
            setSnackeUpdateOpen(true);
            return e;
        }
    };

    const columns = (renderAction: any, renderSwitch: any) => {
        const col = [
            {
                field: "id",
                headerName: "کد برند",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerClassName:
                    "bg-[#E2E8F0] Yekan_bold text-black !font-bold",
                minWidth: 120,
            },
            {
                field: "name",
                headerName: "نام برند",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerClassName: "bg-[#E2E8F0] text-black !font-bold",
                minWidth: 180,
            },
            // {
            //     field: "isActive",
            //     renderCell: (params: any) => {
            //         return params.value === true ? (
            //             <Box component="div" className="bg-green-500 rounded-md">
            //                 <Typography className="px-4 py-1">فعال</Typography>
            //             </Box>
            //         ) : (
            //             <Box component="div" className="bg-red-500 rounded-md">
            //                 <Typography className="px-4 py-1">غیرفعال</Typography>
            //             </Box>
            //         );
            //     },
            //     headerName: "وضعیت",
            //     headerClassName: "bg-[#E2E8F0] text-black !font-bold",
            //     maxWidth: 120,
            // },
            {
                field: "isActive",
                headerName: "وضعیت",
                renderCell: renderSwitch,
                headerClassName: "bg-[#E2E8F0] text-black !font-bold",
                minWidth: 160,
            },
            {
                headerName: "عملیات",
                flex: 1,
                renderCell: renderAction,
                headerClassName: "bg-[#E2E8F0] text-black !font-bold",
                minWidth: 160,
            },
        ];
        return col;
    };

    const renderSwitch = (item: any) => {
        return (
            <Switch
                checked={item?.row.isActive}
                onChange={(_) => onUpdateStatus(item)}
            />
        );
    };
    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                <DeleteGridButton onClick={() => handleDelete(item?.row.id)} />
            </Box>
        );
    };

    if (brandLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {snackePostOpen && (
                <PositionedSnackbar
                    open={snackePostOpen}
                    setState={setSnackePostOpen}
                    title={postData?.data?.Message || postData?.message}
                />
            )}
            {snackeUpdateOpen && (
                <PositionedSnackbar
                    open={snackeUpdateOpen}
                    setState={setSnackeUpdateOpen}
                    title={updateData?.data?.Message || updateData?.message}
                />
            )}
            {snackeDeleteOpen && (
                <PositionedSnackbar
                    open={snackeDeleteOpen}
                    setState={setSnackeDeleteOpen}
                    title={deleteData?.data?.Message || deleteData?.message}
                />
            )}
            <Card className="p-4">
                {/* <Typography color="secondary" variant="h1" className="pb-2 !text-sm md:!text-2xl">برندها</Typography> */}
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
                                onSuccess: (message: any) => {
                                    setFieldValue("id", message.data.id);
                                    refetch();
                                    setSnackePostOpen(true);
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
                            <Form
                                onSubmit={handleSubmit}
                                className="flex flex-col justify-start items-start mb-8"
                            >
                                <Box
                                    component="div"
                                    className="md:flex md:justify-start md:items-start gap-x-4 md:w-[50%]"
                                >
                                    <FormikInput
                                        name="id"
                                        label="کد برند"
                                        disabled={true}
                                        boxClassName="md:w-[50%] mt-2 md:mt-0"
                                    />
                                    <FormikInput
                                        name="name"
                                        label="نام برند"
                                        boxClassName="md:w-[50%] mt-2 md:mt-0"
                                    />
                                    <Button
                                        onClick={() => handleSubmit()}
                                        variant="contained"
                                        color="secondary"
                                        className='mt-2 md:mt-0"'
                                    >
                                        <Typography className="px-2">
                                            <AddCircleOutline />
                                        </Typography>
                                    </Button>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
                <Box component="div" className="w-auto md:w-[40%] mb-4">
                    <FuzzySearch
                        keys={["id", "name"]}
                        data={brands?.data}
                        threshold={0.5}
                        setResults={setResults}
                    />
                </Box>
                <Box
                    component="div"
                    className="md:grid md:grid-cols-2 md:gap-x-4"
                >
                    <Box>
                        <MuiDataGrid
                            columns={columns(renderAction, renderSwitch)}
                            rows={results}
                            data={brands?.data}
                        />
                    </Box>
                    <Box
                        component="div"
                        className="hidden md:flex md:justify-center md:items-center"
                    >
                        <img
                            src={toAbsoulteUrl("/media/logos/barnd.jpg")}
                            width={300}
                        />
                    </Box>
                </Box>
            </Card>
        </>
    );
};

export default Brands;
