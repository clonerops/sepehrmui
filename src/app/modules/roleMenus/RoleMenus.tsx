import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useDeleteRoleMenu, useGetAllApplicationMenus, useGetRoleMenusById, usePostRoleMenus } from "./_hooks";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { IRoleMenu } from "./_models";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import Backdrop from "../../../_cloner/components/Backdrop";

const initialValues: IRoleMenu = {
    roleId: "",
    applicationMenuId: [],
};

type Props = {
    id: string;
};

const RoleMenus = (props: Props) => {
    const { id } = props;
    const { data: appAllMenu, isLoading } = useGetAllApplicationMenus();

    const postMenu = usePostRoleMenus();
    const deleteMenu = useDeleteRoleMenu();
    const roleMenuTools = useGetRoleMenusById(id);

    const [roleIds, setRoleIds] = useState<string[]>([]);

    useEffect(() => {
        let roleId = roleMenuTools?.data?.data.map((item: { applicationMenuId: string }) => item.applicationMenuId);
        setRoleIds(roleId);
    }, [id, roleMenuTools?.data]);

    const handleCheckboxChange = (roleMenuId: string, subId: string, checked: boolean) => {
        if (checked) {
            setRoleIds((prevIds) => [...prevIds, subId]);
            const formData = {
                roleId: id,
                applicationMenuId: [...roleIds, subId],
            };

            postMenu.mutate(formData, {
                onSuccess: (res) => {
                    if (res.succeeded) {
                        EnqueueSnackbar("دسترسی منو با موفقیت انجام شد", "success");
                    } else {
                        EnqueueSnackbar(res?.data.Message, "error");
                    }
                    roleMenuTools.refetch();
                },
            });
        } else {
            setRoleIds((prevIds) => prevIds.filter((id) => id !== subId));
            const filterRoleMenuId = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === subId);
            deleteMenu.mutate(filterRoleMenuId?.id, {
                onSuccess: (message) => {
                    if (message.succeeded) {
                        EnqueueSnackbar("عدم دسترسی منو با موفقیت انجام شد", "info");
                    } else {
                        EnqueueSnackbar(message?.data.Message, "error");
                    }
                    roleMenuTools.refetch();
                },
            });
        }
    };

    if (isLoading) {
        return <Backdrop loading={isLoading} />;
    }

    const renderTreeItems = (nodes: any) => (
        <TreeItem key={nodes.id} itemId={nodes.id} label={
            <div className="flex items-center">
                {Array.isArray(nodes.children) && nodes.children.length === 0 && (
                    <FormControlLabel
                        control={
                            <Switch
                                name="applicationMenuId"
                                onChange={(event) => {
                                    const checked = event.target.checked;
                                    handleCheckboxChange(nodes.id, nodes.id, checked);
                                }}
                                checked={roleIds.includes(nodes.id)}
                            />
                        }
                        label=""
                    />
                )}
                <Typography>{nodes.description}</Typography>
            </div>
        }>
            {Array.isArray(nodes.children) && nodes.children.length > 0 ? (
                nodes.children.map((sub: any) => renderTreeItems(sub))
            ) : null}
        </TreeItem>
    );

    return (
        <>
            {postMenu.isLoading && <Backdrop loading={postMenu.isLoading} />}
            {deleteMenu.isLoading && <Backdrop loading={deleteMenu.isLoading} />}
            {roleMenuTools.isLoading && <Backdrop loading={roleMenuTools.isLoading} />}
            <Box sx={{ minHeight: 180, flexGrow: 1 }}>
                <SimpleTreeView aria-label="file system navigator">
                    {appAllMenu?.data?.map((item: any) =>
                        renderTreeItems(item)
                    )}
                </SimpleTreeView>
            </Box>
        </>
    );
};

export default RoleMenus;
