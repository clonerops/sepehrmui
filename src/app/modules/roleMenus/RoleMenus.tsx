import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useDeleteRoleMenu, useGetAllApplicationMenus, useGetRoleMenusById, usePostRoleMenus } from "./_hooks";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useEffect, useState } from "react";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import Backdrop from "../../../_cloner/components/Backdrop";

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
        setRoleIds(roleId ? roleId : []);
    }, [id, roleMenuTools?.data]);

    const findParentIds = (menuId: string, nodes: any, parentIds: string[] = []): string[] => {
        if (!nodes) return parentIds;
        for (const node of nodes) {
            if (node.id === menuId) {
                return [...parentIds, node.id];
            }
            if (node.children) {
                const found = findParentIds(menuId, node.children, [...parentIds, node.id]);
                if (found.length > 0) return found;
            }
        }
        return [];
    };


    // const handleCheckboxChange = (roleMenuId: string, subId: string, checked: boolean, parentIds: string[]) => {
    //     const allIds = [...parentIds, subId]; // لیست والدین + فرزند

    //     if (checked) {
    //         setRoleIds((prevIds) => [...prevIds, ...allIds]);
    //         const formData = {
    //             roleId: id,
    //             applicationMenuId: [...roleIds, ...allIds],
    //         };

    //         postMenu.mutate(formData, {
    //             onSuccess: (res) => {
    //                 if (res.succeeded) {
    //                     EnqueueSnackbar("دسترسی منو با موفقیت انجام شد", "success");
    //                 } else {
    //                     EnqueueSnackbar(res?.data.Message, "error");
    //                 }
    //                 roleMenuTools.refetch();
    //             },
    //         });
    //     } else {
    //         setRoleIds((prevIds) => prevIds.filter((id) => !allIds.includes(id)));
    //         const filterRoleMenuId = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === subId);
    //         deleteMenu.mutate(filterRoleMenuId?.id, {
    //             onSuccess: (message) => {
    //                 if (message.succeeded) {
    //                     EnqueueSnackbar("عدم دسترسی منو با موفقیت انجام شد", "info");
    //                 } else {
    //                     EnqueueSnackbar(message?.data.Message, "error");
    //                 }
    //                 roleMenuTools.refetch();
    //             },
    //         });
    //     }
    // };

    // const handleCheckboxChange = (roleMenuId: string, subId: string, checked: boolean, parentIds: string[]) => {
    //     const allIds = [...parentIds, subId]; // لیست والدین + فرزند

    //     console.log("[...roleIds, ...allIds]", [...roleIds, ...allIds])

    //     if (checked) {
    //         setRoleIds((prevIds) => [...prevIds, ...allIds]);
    //         const formData = {
    //             roleId: id,
    //             applicationMenuId: [...roleIds, ...allIds],
    //         };

    //         postMenu.mutate(formData, {
    //             onSuccess: (res) => {
    //                 if (res.succeeded) {
    //                     EnqueueSnackbar("دسترسی منو با موفقیت انجام شد", "success");
    //                 } else {
    //                     EnqueueSnackbar(res?.data.Message, "error");
    //                 }
    //                 roleMenuTools.refetch();
    //             },
    //         });
    //     } else {
    //         const updatedRoleIds = roleIds.filter((id) => !allIds.includes(id));
    //         setRoleIds(updatedRoleIds);

    //         const filterRoleMenuId = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === subId);
    //         deleteMenu.mutate(filterRoleMenuId?.id, {
    //             onSuccess: (message) => {
    //                 if (message.succeeded) {
    //                     EnqueueSnackbar("عدم دسترسی منو با موفقیت انجام شد", "info");

    //                     // بررسی و حذف منوی والد در صورتی که هیچ فرزندی دسترسی نداشته باشد
    //                     parentIds.forEach((parentId) => {
    //                         const parentNode = appAllMenu?.data.find((node: any) => node.id === parentId);
    //                         if (parentNode) {
    //                             const remainingChildren = parentNode.children.filter((child: any) =>
    //                                 updatedRoleIds.includes(child.id)
    //                             );
    //                             if (remainingChildren.length === 0) {
    //                                 // والد را هم حذف کن
    //                                 setRoleIds((prevIds) => prevIds.filter((id) => id !== parentId));
    //                                 const parentRoleMenu = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === parentId);
    //                                 if (parentRoleMenu) {
    //                                     deleteMenu.mutate(parentRoleMenu.id, {
    //                                         onSuccess: (msg) => {
    //                                             if (msg.succeeded) {
    //                                                 EnqueueSnackbar(`منوی ${parentId} نیز حذف شد`, "info");
    //                                             } else {
    //                                                 EnqueueSnackbar(msg?.data.Message, "error");
    //                                             }
    //                                         },
    //                                     });
    //                                 }
    //                             }
    //                         }
    //                     });

    //                 } else {
    //                     EnqueueSnackbar(message?.data.Message, "error");
    //                 }
    //                 roleMenuTools.refetch();
    //             },
    //         });
    //     }
    // };

    const handleCheckboxChange = (roleMenuId: string, subId: string, checked: boolean, parentIds: string[]) => {
        const allIds = [...parentIds, subId]; // لیست والدین + فرزند

        if (checked) {
            // استفاده از Set برای حذف مقادیر تکراری
            const updatedRoleIds = new Set([...roleIds, ...allIds]);
            setRoleIds(Array.from(updatedRoleIds));

            const formData = {
                roleId: id,
                applicationMenuId: Array.from(updatedRoleIds),
            };
            console.log("formDataPost", formData)
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
            // حذف همه `allIds` از `roleIds`
            const updatedRoleIds = roleIds.filter((id) => !allIds.includes(id));
            setRoleIds(updatedRoleIds);

            const filterRoleMenuId = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === subId);
            console.log("filterRoleMenuId", filterRoleMenuId)
            deleteMenu.mutate(filterRoleMenuId?.id, {
                onSuccess: (message) => {
                    if (message.succeeded) {
                        EnqueueSnackbar("عدم دسترسی منو با موفقیت انجام شد", "info");

                        // بررسی و حذف منوی والد در صورتی که هیچ فرزندی دسترسی نداشته باشد
                        parentIds.forEach((parentId) => {
                            const parentNode = appAllMenu?.data.find((node: any) => node.id === parentId);
                            if (parentNode) {
                                const remainingChildren = parentNode.children.filter((child: any) =>
                                    updatedRoleIds.includes(child.id)
                                );
                                if (remainingChildren.length === 0) {
                                    // والد را هم حذف کن
                                    setRoleIds((prevIds) => prevIds.filter((id) => id !== parentId));
                                    const parentRoleMenu = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === parentId);
                                    if (parentRoleMenu) {
                                        deleteMenu.mutate(parentRoleMenu.id, {
                                            onSuccess: (msg) => {
                                                if (msg.succeeded) {
                                                    EnqueueSnackbar(`منوی ${parentId} نیز حذف شد`, "info");
                                                } else {
                                                    EnqueueSnackbar(msg?.data.Message, "error");
                                                }
                                            },
                                        });
                                    }
                                }
                            }
                        });

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

    const renderTreeItems = (nodes: any, parentIds: string[] = []) => (
        <TreeItem key={nodes.id} itemId={nodes.id} label={
            <div className="flex items-center">
                {Array.isArray(nodes.children) && nodes.children.length === 0 && (
                    <FormControlLabel
                        control={
                            <Switch
                                name="applicationMenuId"
                                onChange={(event) => {
                                    const checked = event.target.checked;
                                    const parents = findParentIds(nodes.id, appAllMenu?.data);
                                    handleCheckboxChange(nodes.id, nodes.id, checked, parents);
                                }}
                                checked={roleIds?.includes(nodes.id)}
                            />
                        }
                        label=""
                    />
                )}
                <Typography>{nodes.description}</Typography>
            </div>
        }>
            {Array.isArray(nodes.children) && nodes.children.length > 0 ? (
                nodes.children.map((sub: any) => renderTreeItems(sub, [...parentIds, nodes.id]))
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
