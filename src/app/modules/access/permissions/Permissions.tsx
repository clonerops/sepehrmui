import { Box, Typography } from "@mui/material";
// import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
// import FormikInput from "../../../../_cloner/components/FormikInput";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
// import { AddCircleOutline } from "@mui/icons-material";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import { useDeletePermissions,  useGetPermissionsFilter } from "./_hooks";
import { IPermission } from "./_models";
// import { createPermissionValidation } from "./_validation";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import PermissionForm from "./PermissionForm";
// import Pagination from "../../../../_cloner/components/Pagination";
import Backdrop from "../../../../_cloner/components/Backdrop";
import Pagination from "../../../../_cloner/components/Pagination";

interface Item {
    name: string;
    description: string;
}

// const initialValues = {
//     name: "",
//     description: "",
// };

// const validation = Yup.object({
//   desc: Yup.string().required("فیلد الزامی می باشد")
// })

const pageSize = 200

const Permissions = () => {
    const [results, setResults] = useState<Item[]>([]);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IPermission>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    let formData = {
        pageNumber: currentPage,
        pageSize: pageSize,
    }


    const deletePermissions = useDeletePermissions();
    // const permissionTools = useGetPermissions();
    const Permissions = useGetPermissionsFilter(formData);

    useEffect(() => {
        setResults(Permissions?.data?.data);
         // eslint-disable-next-line
    }, [Permissions?.data?.data]);

    const columns = (renderAction: any) => {
        const col = [
            // {
            //     field: "name",
            //     renderCell: (params: any) => {
            //         return <Typography variant="h4">{params.value}</Typography>;
            //     },
            //     headerName: "عنوان مجوز",
            //     headerClassName: "headerClassName",
            //     minWidth: 120,
            //     flex: 1,
            // },
            {
                field: "permissionName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "عنوان لاتین مجوز",
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1,
            },
            {
                field: "description",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "عنوان فارسی مجوز",
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1,
            },
            {
                field: "applicationMenuName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "عنوان منو",
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

    const handleEdit = (item: IPermission) => {
        setItemForEdit(item);
        setIsEditOpen(true);
    };

    const handleDelete = (id: string) => {
        deletePermissions.mutate(id, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    EnqueueSnackbar("مجوز با موفقیت حذف گردید.", "success")
                    Permissions.refetch();
                } else {
                    EnqueueSnackbar(message?.data?.Message, "error")
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

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    // if(Permissions.isLoading) {
    //     return <Typography>Loading ...</Typography>
    // }
    

    return (
        <>
            {deletePermissions.isLoading && <Backdrop loading={deletePermissions.isLoading} />}
            <ReusableCard>
                <Box
                    component="div"
                    className="md:grid md:grid-cols-3 md:gap-x-4"
                >
                    <Box component="div" className="lg:col-span-2">
                        <PermissionForm refetch={Permissions.refetch} />
                        <FuzzySearch<Item>
                            keys={["permissionName", "description"]}
                            data={Permissions?.data?.data || []}
                            setResults={setResults}
                        />
                        <Box component="div" className="my-4">
                            <MuiDataGrid
                                columns={columns(renderAction)}
                                rows={results}
                                data={Permissions?.data?.data}
                                isLoading={Permissions.isLoading}
                                onDoubleClick={(item: any) => handleEdit(item?.row)}
                            />
                            <Pagination pageCount={+Permissions?.data?.data.length / +pageSize || 200} onPageChange={handlePageChange} />
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
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                width="50%"
                title="ویرایش"
                description="درصورتی که مغایرتی در ویرایش مجوز وجود دارد می توانید از طریق فرم ذیل اقدام به ویرایش اطلاعات کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <PermissionForm
                    id={itemForEdit?.id}
                    refetch={Permissions.refetch}
                    onClose={() => setIsEditOpen(false)}
                />
            </TransitionsModal>

        </>
    );
};

export default Permissions;
