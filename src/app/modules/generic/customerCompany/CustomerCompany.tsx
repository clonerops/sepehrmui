import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import { ICustomerCompany } from "./_models";
import {
    useDeleteCustomerCompanies,
    useGetCustomerCompanies,
    useUpdateCustomerCompanies,
} from "./_hooks";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import CustomerCompanyForm from "./CustomerCompanyForm";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import SwitchComponent from "../../../../_cloner/components/Switch";
import { enqueueSnackbar } from "notistack";
import Backdrop from "../../../../_cloner/components/Backdrop";

const CustomerCompanies = () => {
    const { data: customerCompanies, refetch, isLoading: CustomerCompanyLoading, } = useGetCustomerCompanies("");
    const updateTools = useUpdateCustomerCompanies()
    const [open, setIsOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<ICustomerCompany>();


    const [results, setResults] = useState<ICustomerCompany[]>([]);

    useEffect(() => {
        setResults(customerCompanies?.data);
    }, [customerCompanies?.data]);


    const onUpdateStatus = (rowData: any) => {
        try {
            const formData = {
                ...rowData.row,
                isActive: !rowData.row.isActive,
            };
            updateTools.mutate(formData, {
                onSuccess: () => {
                    enqueueSnackbar("تغییر وضعیت با موفقیت انجام شد", {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "center" }
                    })
                    refetch();
                },
            });
        } catch (e) {
            return e;
        }
    };

    const handleEdit = (item: ICustomerCompany) => {
        setItemForEdit(item);
        setIsEditOpen(true);
    };

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "companyName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام شرکت",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "customerFullName",
                renderCell: (params: any) => {
                    return (
                        <Typography variant="h4">
                            {params.row.customer.firstName +
                                " " +
                                params.row.customer.lastName}
                        </Typography>
                    );
                },
                headerName: "مشتری",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "economicId",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "شناسه اقتصادی",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "nationalId",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "شناسه ملی",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "tel1",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "تلفن",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "tel2",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "موبایل",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            { headerName: 'عملیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
        ];
        return col;
    };

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                <SwitchComponent
                    checked={item?.row.isActive}
                    onChange={(_) => onUpdateStatus(item)}
                />
                <EditGridButton onClick={() => handleEdit(item?.row)} />
            </Box>
        );
    };

    if (CustomerCompanyLoading) {
        return <Backdrop loading={CustomerCompanyLoading} />;
    }

    return (
        <>
            <ReusableCard>
                <Box component="div" >
                    <Box component="div">
                        <Box
                            component="div"
                            className="md:flex md:justify-between md:items-center space-y-2"
                        >
                            <Box
                                component="div"
                                className="w-auto md:w-[40%] mb-2"
                            >
                                <FuzzySearch
                                    keys={[
                                        "companyName",
                                        "customerFullName",
                                        "economicId",
                                        "nationalId",
                                        "tel1",
                                        "tel2",
                                    ]}
                                    data={customerCompanies?.data}
                                    threshold={0.5}
                                    setResults={setResults}
                                />
                            </Box>
                            <Button
                                onClick={() => setIsOpen(true)}
                                variant="contained"
                                color="secondary"
                            >
                                <Typography variant="h4">تعریف شرکت</Typography>
                            </Button>
                        </Box>
                        <MuiDataGrid
                            columns={columns(renderAction)}
                            rows={results}
                            data={customerCompanies?.data}
                        />
                    </Box>
                </Box>
            </ReusableCard>
            <TransitionsModal title="تعریف شرکت رسمی مشتری" open={open} isClose={() => setIsOpen(false)} width="50%">
                <CustomerCompanyForm refetch={refetch} />
            </TransitionsModal>
            <TransitionsModal open={isEditOpen} isClose={() => setIsEditOpen(false)} title="ویرایش" width="50%">
                <CustomerCompanyForm id={itemForEdit?.id} refetch={refetch} />
            </TransitionsModal>
        </>
    );
};

export default CustomerCompanies;
