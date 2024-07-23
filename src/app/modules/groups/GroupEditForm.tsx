import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

import { useGetApplicationRole, usePutApplicationRoles } from "./_hooks";
import {
    useGetAllPermissionByMenus,
    useGetPermissions,
} from "../permissions/_hooks";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import CheckboxGroup from "../../../_cloner/components/CheckboxGroup";
import Backdrop from "../../../_cloner/components/Backdrop";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar";
import { dropdownPermissionsByMenu } from "../../../_cloner/helpers/dropdowns";
import RoleMenus from "../roleMenus/RoleMenus";

type Props = {
    itemData: { id: string; name: string };
};

const initialValues = {
    name: "",
    description: "",
    rolePermissions: [],
};

const GroupEditForm = (props: Props) => {
    const { itemData } = props;
    const putApplicationRoles = usePutApplicationRoles();
    const detailApplicationRole = useGetApplicationRole();
    const permissions = useGetPermissions();
    const { data: appAllMenu } = useGetAllPermissionByMenus();

    const [mode, setMode] = useState<boolean>(false);

    useEffect(() => {
        detailApplicationRole.mutate(itemData.id);
        // eslint-disable-next-line
    }, [itemData.id]);

    const onSubmit = (values: any) => {
        const formData = {
            name: values.name,
            description: values.description,
            id: values.id,
            rolePermissions: values.rolePermissions.map((item: string) => ({
                permissionId: item,
                roleId: itemData.id,
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
    };

    if (detailApplicationRole?.isLoading) {
        return <Backdrop loading={detailApplicationRole.isLoading} />;
    }

    return (
        <>
            {(putApplicationRoles.isLoading || permissions.isLoading) && (
                <Backdrop
                    loading={
                        putApplicationRoles.isLoading || permissions.isLoading
                    }
                />
            )}
            <Formik
                enableReinitialize
                initialValues={{
                    ...initialValues,
                    ...detailApplicationRole?.data?.data,
                    rolePermissions:
                        detailApplicationRole?.data?.data.rolePermissions.map(
                            (item: { permissionId: string }) =>
                                item.permissionId
                        ),
                }}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <ReusableCard>
                                <div className="py-4 flex flex-row justify-between items-center">
                                    <div className="flex justify-end items-center gap-x-4 mt-4 w-full">
                                        <Button
                                            onClick={() => setMode(false)}
                                            variant="contained"
                                            color="primary"
                                        >
                                            <Typography>
                                                دسترسی مجوزها
                                            </Typography>
                                        </Button>
                                        <Button
                                            onClick={() => setMode(true)}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            <Typography>
                                                دسترسی منوها
                                            </Typography>
                                        </Button>
                                    </div>
                                </div>

                                {!mode ? (
                                    <>
                                        <SimpleTreeView
                                            aria-label="file system navigator"
                                            // defaultCollapseIcon={<ExpandMore />}
                                            // defaultExpandIcon={<ChevronRight />}
                                        >
                                            {appAllMenu?.data?.map(
                                                (item: {
                                                    applicationMenuId: string;
                                                    applicationMenuName: string;
                                                    description: string;
                                                    permissions: any[];
                                                }) => (
                                                    <TreeItem
                                                        className="!my-4 !p-4 !bg-gray-100 !rounded-lg"
                                                        itemId={
                                                            item.applicationMenuId
                                                        }
                                                        label={`${item.applicationMenuName}`}
                                                    >
                                                        <div>
                                                            <div className="w-full !p-4">
                                                                <div className="flex flex-col items-center">
                                                                    <CheckboxGroup
                                                                        options={dropdownPermissionsByMenu(
                                                                            item?.permissions
                                                                        )}
                                                                        label=""
                                                                        name="rolePermissions"
                                                                        boxClassName="grid grid-cols-2 md:grid-cols-3 gap-x-4"
                                                                    />
                                                                    <div className="flex flex-row justify-end items-end gap-x-4 w-full">
                                                                        <Button
                                                                            onClick={() =>
                                                                                handleSubmit()
                                                                            }
                                                                            className="!bg-yellow-500 !text-white"
                                                                        >
                                                                            <Typography>
                                                                                ثبت
                                                                                مجوز
                                                                            </Typography>
                                                                        </Button>
                                                                    </div>

                                                                    {/* <FileSystemNavigator content={<div>
                                                            </div>
                                                            } /> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TreeItem>
                                                )
                                            )}
                                        </SimpleTreeView>

                                        {/* <div className="flex flex-row justify-end items-center gap-x-4">
                                        <Button onClick={() => handleSubmit()} className="!bg-yellow-500 !text-white">
                                            <Typography>ثبت مجوز</Typography>
                                        </Button>
                                    </div> */}
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
