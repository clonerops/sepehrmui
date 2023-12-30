import { Box, Typography, IconButton } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { AddCircleOutline } from "@mui/icons-material";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import { useDeletePermissions, useGetPermissions, usePostPermissions } from "./_hooks";
import { IPermission } from "./_models";
import { createPermissionValidation } from "./_validation";
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions";

interface Item {
    name: string;
    description: string;
}

const initialValues = {
    name: "",
    description: "",
};

// const validation = Yup.object({
//   desc: Yup.string().required("فیلد الزامی می باشد")
// })

const Permissions = () => {
    const [results, setResults] = useState<Item[]>([]);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IPermission>();

    const postPermissions = usePostPermissions();
    const deletePermissions = useDeletePermissions();
    const Permissions = useGetPermissions();
    useEffect(() => {
        setResults(Permissions?.data?.data);
    }, [Permissions?.data?.data]);

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "name",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "عنوان مجوز",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "description",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "توضیحات",
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1,
            },
            {
                field: "action",
                renderCell: renderAction,
                headerName: "عملیات",
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1,
            },
        ];
        return col;
    };

    const handlePost = (values: any) => {
        postPermissions.mutate(values, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    validateAndEnqueueSnackbar(message?.message, "success")
                    Permissions.refetch();
                } else {
                    validateAndEnqueueSnackbar(message?.data?.Message, "error")
                }
            },
        });
    };

    const handleEdit = (item: IPermission) => {
        setItemForEdit(item);
        setIsEditOpen(true);
    };

    const handleDelete = (id: string) => {
        deletePermissions.mutate(id, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    validateAndEnqueueSnackbar("مجوز با موفقیت حذف گردید.", "success")
                    Permissions.refetch();
                } else {
                    validateAndEnqueueSnackbar(message?.data?.Message, "error")
                }
            },
        });
    };

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} />
            </Box>
        );
    };


    return (
        <>
            <ReusableCard>
                <Box
                    component="div"
                    className="md:grid md:grid-cols-2 md:gap-x-4"
                >
                    <Box component="div">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handlePost}
                            validationSchema={createPermissionValidation}
                        >
                            {({ handleSubmit }) => {
                                return (
                                    <Form
                                        onSubmit={handleSubmit}
                                        className="mb-4"
                                    >
                                        <Box
                                            component="div"
                                            className="md:flex md:justify-start md:items-start gap-x-4 "
                                        >
                                            <FormikInput
                                                name="name"
                                                label="عنوان مجوز"
                                                autoFocus={true}
                                                boxClassName=" mt-2 md:mt-0"
                                            />
                                            <FormikInput
                                                name="description"
                                                label="توضیحات"
                                                boxClassName=" mt-2 md:mt-0"
                                            />
                                            <Box
                                                component="div"
                                                className="mt-2 md:mt-0"
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        handleSubmit()
                                                    }
                                                    className="!bg-[#fcc615]"
                                                >
                                                    <AddCircleOutline color="primary" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                        <FuzzySearch<Item>
                            keys={["name", "description"]}
                            data={Permissions?.data?.data || []}
                            setResults={setResults}
                            threshold={0.3}
                        />
                        <Box component="div" className="my-4">
                            <MuiDataGrid
                                columns={columns(renderAction)}
                                rows={results}
                                data={Permissions?.data?.data}
                            />
                        </Box>

                    </Box>
                    <Box component="div">
                            <Box
                                component="div"
                                className="hidden md:flex md:justify-center md:items-center"
                            >
                                <Box
                                    component="img"
                                    src={toAbsoulteUrl(
                                        "/media/logos/34313.jpg"
                                    )}
                                    width={400}
                                />
                            </Box>
                        </Box>

                </Box>
            </ReusableCard>
        </>
    );
};

export default Permissions;
