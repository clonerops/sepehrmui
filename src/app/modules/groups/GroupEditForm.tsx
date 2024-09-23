import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Checkbox, Typography } from "@mui/material";

import { useGetApplicationRole, usePutApplicationRoles } from "./_hooks";
import {
    useGetAllPermissionByMenus,
    useGetPermissions,
} from "../permissions/_hooks";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import Backdrop from "../../../_cloner/components/Backdrop";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import RoleMenus from "../roleMenus/RoleMenus";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { AssignPermissionToRole } from "../../../_cloner/helpers/columns";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../routing/AccessDenied";

interface IMenuItem {
    applicationMenuId: string;
    applicationMenuName: string;
    description: string;
    permissions: any[];
}

type Props = {
    itemData: { id: string; name: string, description: string, rolePermissions: any };
};

const initialValues = {
    name: "",
    description: "",
    rolePermissions: [],
};

const GroupEditForm = (props: Props) => {
    const {hasPermission} = useAuth()

    const { itemData } = props;
    const putApplicationRoles = usePutApplicationRoles();
    const detailApplicationRole = useGetApplicationRole();
    const permissions = useGetPermissions();
    const { data: appAllMenu } = useGetAllPermissionByMenus();

    const [mode, setMode] = useState<boolean>(false);
    const [results, setResults] = useState<any>([]);
    const [selectedIds, setSelectedIds] = useState<any>([]);

    let allPermissions = [].concat(...appAllMenu?.data?.map((item: IMenuItem) => item.permissions || []) || [])

    useEffect(() => {
        detailApplicationRole.mutate(itemData.id, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    const ids = response.data.rolePermissions.map((item: { permissionId: string }) => item.permissionId)
                    setSelectedIds(ids)
            
                } else {
                    setSelectedIds([])
                }
            }
        });
        // eslint-disable-next-line
    }, [itemData.id]);

    useEffect(() => {
        setResults(allPermissions);
        // eslint-disable-next-line
    }, [appAllMenu?.data]);

    const handleCheckboxClick = (item: any) => {
        const currentIndex = selectedIds.indexOf(item?.id);
        const newSelectedIds = [...selectedIds];

        if (currentIndex === -1) {
            newSelectedIds.push(item?.id);
        } else {
            newSelectedIds.splice(currentIndex, 1);
        }

        const formData = {
            name: itemData.name,
            description: itemData.description,
            id: itemData.id,
            rolePermissions: newSelectedIds.map((i: string) => ({
                permissionId: i,
                roleId: itemData.id
            })),
        };
        putApplicationRoles.mutate(formData, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    EnqueueSnackbar("ویرایش گروه با موفقیت انجام شد", "info");
                } else {
                    EnqueueSnackbar(message?.data?.Message, "error");
                }
            },
        });

        setSelectedIds(newSelectedIds);
    }

    const renderCheckbox = (item: any) => {
        const isChecked = selectedIds.includes(item.row.id);

        return (
            <div className="flex justify-center items-center gap-x-4">
                <Checkbox
                    checked={isChecked}
                    onChange={() => handleCheckboxClick(item.row)}
                />
            </div>
        );
    };

    if(!hasPermission("CreateApplicationRole"))
        return <AccessDenied />

    if (detailApplicationRole?.isLoading) {
        return <Backdrop loading={detailApplicationRole.isLoading} />;
    }

    return (
        <>
            {putApplicationRoles.isLoading && <Backdrop loading={putApplicationRoles.isLoading} />}
            {permissions.isLoading && <Backdrop loading={permissions.isLoading} />}

            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={() => { }}
            >
                {() => {
                    return (
                        <>
                            <ReusableCard>
                                <div className="py-4 flex flex-row justify-between items-center">
                                    <div className="flex justify-end items-center gap-x-4 mt-4 w-full">
                                        <Button onClick={() => setMode(false)} variant="contained" color="primary">
                                            <Typography>
                                                دسترسی مجوزها
                                            </Typography>
                                        </Button>
                                        <Button onClick={() => setMode(true)} variant="contained" color="secondary">
                                            <Typography>
                                                دسترسی منوها
                                            </Typography>
                                        </Button>
                                    </div>
                                </div>

                                {!mode ? (
                                    <>
                                        <div className="mb-4">
                                            <FuzzySearch
                                                keys={[
                                                    "description",
                                                    "name",
                                                    "applicationMenuName",
                                                ]}
                                                data={allPermissions}
                                                setResults={setResults}
                                            />
                                        </div>

                                        <MuiDataGrid
                                            columns={AssignPermissionToRole(renderCheckbox)}
                                            rows={results}
                                            data={allPermissions}
                                            height={520}
                                            onDoubleClick={() => { }}
                                        />

                                    </>
                                ) : (
                                    <>
                                        <RoleMenus id={itemData.id} />
                                    </>
                                )}
                            </ReusableCard>
                        </>
                    );
                }}
            </Formik>
        </>
    );
};

export default GroupEditForm;
