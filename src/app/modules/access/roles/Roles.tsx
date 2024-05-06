import { Box, Typography, IconButton } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
    useDeleteApplicationRoles,
    useGetApplicationRoles,
    usePostApplicationRoles,
} from "./core/_hooks";
import { enqueueSnackbar } from "notistack";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { AddCircleOutline } from "@mui/icons-material";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import { roleCreateValidation } from "./helpers/validations";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import Backdrop from "../../../../_cloner/components/Backdrop";

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

const Roles = () => {
    const [results, setResults] = useState<Item[]>([]);
    // const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    // const [itemForEdit, setItemForEdit] = useState<IRole>();

    const postApplicationRoles = usePostApplicationRoles();
    const deleteApplicationRoles = useDeleteApplicationRoles();
    const applicationRoles = useGetApplicationRoles();
    useEffect(() => {
        setResults(applicationRoles?.data?.data);
         // eslint-disable-next-line
    }, [applicationRoles?.data?.data]);

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "name",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نقش کاربری",
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
        postApplicationRoles.mutate(values, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    enqueueSnackbar("Role is successfully created", {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                    applicationRoles.refetch();
                } else {
                    enqueueSnackbar(message?.data?.Message, {
                        variant: "error",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                }
            },
        });
    };

    // const handleEdit = (item: IRole) => {
    //     setItemForEdit(item);
    //     setIsEditOpen(true);
    // };

    const handleDelete = (id: number) => {
        deleteApplicationRoles.mutate(id, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    enqueueSnackbar("Role is successfully deleted", {
                        variant: "info",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                    applicationRoles.refetch();
                } else {
                    enqueueSnackbar(message?.data?.Message, {
                        variant: "error",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                }
            },
        });
    };

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                {/* <EditGridButton onClick={() => handleEdit(item?.row)} /> */}
                <EditGridButton onClick={() => {}} />
                <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} />
            </Box>
        );
    };


    return (
        <>
            {(postApplicationRoles.isLoading || deleteApplicationRoles.isLoading) && <Backdrop loading={postApplicationRoles.isLoading || deleteApplicationRoles.isLoading} />}
            <ReusableCard>
                <Box
                    component="div"
                    className="md:grid md:grid-cols-2 md:gap-x-4"
                >
                    <Box component="div">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handlePost}
                            validationSchema={roleCreateValidation}
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
                                                label="نقش کاربری"
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
                            data={applicationRoles?.data?.data || []}
                            setResults={setResults}
                        />
                        <Box component="div" className="my-4">
                            <MuiDataGrid
                                columns={columns(renderAction)}
                                rows={results}
                                data={applicationRoles?.data?.data}
                                isLoading={applicationRoles.isLoading}
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
                                        "/media/logos/roles.png"
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

export default Roles;
