import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { ICustomerCompany } from "./_models";
import {
    useGetCustomerCompanies,
    useUpdateCustomerCompanies,
} from "./_hooks";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import CustomerCompanyForm from "./CustomerCompanyForm";
import EditGridButton from "../../../_cloner/components/EditGridButton";
import SwitchComponent from "../../../_cloner/components/Switch";
import Backdrop from "../../../_cloner/components/Backdrop";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { CustomerCompaniesColumn } from "../../../_cloner/helpers/columns";
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../routing/AccessDenied";

const CustomerCompanies = () => {
    const { hasPermission } = useAuth()

    const customerCompanyTools = useGetCustomerCompanies("");
    const updateTools = useUpdateCustomerCompanies()

    const [open, setIsOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<ICustomerCompany>();


    const [results, setResults] = useState<ICustomerCompany[]>([]);

    useEffect(() => {
        setResults(customerCompanyTools?.data?.data);
    }, [customerCompanyTools?.data?.data]);


    const onUpdateStatus = (rowData: any) => {
        try {
            const formData = {
                ...rowData.row,
                isActive: !rowData.row.isActive,
            };
            updateTools.mutate(formData, {
                onSuccess: () => {
                    EnqueueSnackbar("تغییر وضعیت با موفقیت انجام شد", "success")
                    customerCompanyTools.refetch();
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

    const renderAction = (item: any) => {
        return (
            <div className="flex gap-4">
                {hasPermission("UpdateCustomerOfficialCompany") &&
                    <>
                        <SwitchComponent
                            checked={item?.row.isActive}
                            onChange={(_) => onUpdateStatus(item)}
                        />
                        <EditGridButton onClick={() => handleEdit(item?.row)} />
                    </>
                }
            </div>
        );
    };

    if (!hasPermission("CreateCustomerOfficialCompany"))
        return <AccessDenied />
    return (
        <>
            {customerCompanyTools.isLoading && <Backdrop loading={customerCompanyTools.isLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            <ReusableCard>
                <div>
                    <div className="md:flex md:justify-between md:items-center space-y-2">
                        <div className="w-auto md:w-[40%] mb-2" >
                            <FuzzySearch
                                keys={[
                                    "companyName",
                                    "customerFullName",
                                    "economicId",
                                    "nationalId",
                                    "tel1",
                                    "tel2",
                                ]}
                                data={customerCompanyTools?.data?.data}
                                setResults={setResults}
                            />
                        </div>
                        <Button
                            onClick={() => setIsOpen(true)}
                            variant="contained"
                            color="secondary"
                        >
                            <Typography variant="h4">تعریف شرکت</Typography>
                        </Button>
                    </div>
                    <MuiDataGrid
                        columns={CustomerCompaniesColumn(renderAction)}
                        rows={results}
                        data={customerCompanyTools?.data?.data}
                        onDoubleClick={(item: any) => handleEdit(item?.row)}
                    />
                </div>
            </ReusableCard>
            <TransitionsModal title="تعریف شرکت رسمی مشتری" open={open} isClose={() => setIsOpen(false)} width="50%">
                <CustomerCompanyForm refetch={customerCompanyTools.refetch} />
            </TransitionsModal>
            <TransitionsModal open={isEditOpen} isClose={() => setIsEditOpen(false)} title="ویرایش" width="50%">
                <CustomerCompanyForm id={itemForEdit?.id} refetch={customerCompanyTools.refetch} />
            </TransitionsModal>
        </>
    );
};

export default CustomerCompanies;
