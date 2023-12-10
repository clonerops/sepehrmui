import { Box, Button, Card, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    useDeleteApplicationRoles,
    useGetApplicationRoles,
    usePostApplicationRoles,
} from "./core/_hooks";
import { enqueueSnackbar } from "notistack";
import FormikInput from "../../../_cloner/components/FormikInput";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";

interface Item {
    name: string;
    description: string;
}

const initialValues = {
    name: "",
    description: "",
};

const Roles = () => {
    // State
    const [results, setResults] = useState<Item[]>([]);
    const postApplicationRoles = usePostApplicationRoles();
    const deleteApplicationRoles = useDeleteApplicationRoles();
    const applicationRoles = useGetApplicationRoles();
    useEffect(() => {
        setResults(applicationRoles?.data);
    }, [applicationRoles?.data]);

    const columns = (renderActions: any) => {
        return [
            { field: "name", headerName: "نام نقش", flex: 1 },
            { field: "description", headerName: "توضیحات", flex: 1 },
            {
                field: "delete",
                headerName: "عملیات",
                flex: 1,
                render: renderActions,
            },
        ];
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

    const handleDelete = (id: number) => {
        deleteApplicationRoles.mutate(id, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    enqueueSnackbar("Role is successfully deleted", {
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

    const renderActions = (item: any) => {
        return (
            <Box component="div" className="tw-flex tw-gap-4">
                <Box
                    component="div"
                    className="tw-bg-yellow-500 tw-px-4 tw-py-2 tw-cursor-pointer tw-rounded-md"
                >
                    <Box
                        component="div"
                        className="flex items-center gap-x-3  tw-text-white"
                    >
                        <DeleteIcon
                            className={"cursor-pointer text-primary"}
                            onClick={() => handleDelete(item?.id)}
                            titleAccess={"حذف"}
                        />
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <>
            <Card className="glassmorphism-card p-2">
                <Typography variant="h2" color="primary">
                    {"نقش ها"}
                </Typography>
                <Box component="div" className="my-8">
                    <Formik initialValues={initialValues} onSubmit={handlePost}>
                        {({ values }) => {
                            return (
                                <Form>
                                    <Box
                                        component="div"
                                        className="flex flex-row gap-x-8"
                                    >
                                        <FormikInput name="name" label="Name" />
                                        <FormikInput
                                            name="description"
                                            label="Description"
                                        />
                                    </Box>
                                    <Button
                                        variant="contained"
                                        className="w-[240px] bg-primary text-white px-8 py-2"
                                        onClick={() => handlePost(values)}
                                    >
                                        ایجاد نقش کاربری
                                    </Button>
                                </Form>
                            );
                        }}
                    </Formik>
                </Box>
                <FuzzySearch<Item>
                    keys={["name", "description"]}
                    data={applicationRoles?.data || []}
                    setResults={setResults}
                    threshold={0.3}
                />
                <Box component="div" className="my-4">
                    <MuiDataGrid
                        columns={columns(renderActions)}
                        rows={results}
                        data={applicationRoles?.data}
                    />
                </Box>
            </Card>
        </>
    );
};

export default Roles;
