import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { AddCircleOutline } from "@mui/icons-material";
import * as Yup from "yup";

import FormikInput from "../../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import SwitchComponent from "../../../../_cloner/components/Switch";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../../_cloner/components/ReusableCard";

import { IBrand } from "./_models";
import { useGetBrands, usePostBrands, useUpdateBrands } from "./_hooks";
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions";
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
    const { mutate: postBrand } = usePostBrands();
    const { mutate: updateBrand } = useUpdateBrands();
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
    //                     validateAndEnqueueSnackbar(response.message, "success")
    //                   } else {
    //                     validateAndEnqueueSnackbar(response.data.Message, "error")
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
                    if(response.succeeded) {
                        validateAndEnqueueSnackbar(response.message, "success")
                      } else {
                        validateAndEnqueueSnackbar(response.data.Message, "error")
                      }
                    refetch()
                },
            });
        } catch (e) {
            return e;
        }
    };

    const columns = ( renderSwitch: any) => {
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
    //         <Box component="div" className="flex gap-4">
    //             <DeleteGridButton onClick={() => handleDelete(item?.row.id)} />
    //         </Box>
    //     );
    // };

    if (brandLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <ReusableCard>
                <Box component="div" className="md:grid md:grid-cols-2 md:gap-x-4">
                    <Box component="div">
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
                                            if(response.succeeded) {
                                                validateAndEnqueueSnackbar(response.message, "success")
                                                setFieldValue('id', response.data.id)
                                                refetch();
                                              } else {
                                                validateAndEnqueueSnackbar(response.data.Message, "warning")
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
                                    <Form
                                        onSubmit={handleSubmit}
                                        className="mb-4"
                                    >
                                        <Box
                                            component="div"
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
                                            <Box component="div" className="mt-2 md:mt-0">
                                                <ButtonComponent
                                                    onClick={() => handleSubmit()}
                                                >
                                                    <Typography className="px-2">
                                                        <AddCircleOutline />
                                                    </Typography>
                                                </ButtonComponent>
                                            </Box>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                        <Box component="div" className="mb-4">
                            <FuzzySearch
                                keys={["id", "name"]}
                                data={brands?.data}
                                threshold={0.5}
                                setResults={setResults}
                            />
                        </Box>
                        <MuiDataGrid
                            columns={columns(renderSwitch)}
                            rows={results}
                            data={brands?.data}
                        />

                    </Box>
                    <Box component="div">
                        <Box
                            component="div"
                            className="hidden md:flex md:justify-center md:items-center"
                        >
                            <Box component="img"
                                src={toAbsoulteUrl("/media/logos/8595513.jpg")}
                                width={400}
                            />
                        </Box>
                    </Box>
                </Box>
            </ReusableCard>
        </>
    );
};

export default Brands;
