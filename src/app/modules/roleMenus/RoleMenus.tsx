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

    const handleCheckboxChange = (
        subId: string, // applicationMenuId فعلی
        checked: boolean,
        directParentId: string | null // applicationMenuId والد
    ) => {
        // پیدا کردن roleMenuId مربوط به subId از لیست roleMenuTools
        const roleMenuItem = roleMenuTools?.data?.data.find(
            (item: { applicationMenuId: string }) => item.applicationMenuId === subId
        );
        const roleMenuId = roleMenuItem ? roleMenuItem.id : null;

        if (checked) {
            // وقتی سوئیچ روشن می‌شود
            const updatedRoleIds = new Set([...roleIds, subId]);

            // والد مستقیم را اضافه کن اگر وجود داشته باشد
            // if (directParentId) {
            //     const parentRoleMenuItem = roleMenuTools?.data?.data.find(
            //         (item: { applicationMenuId: string }) => item.applicationMenuId === directParentId
            //     );
            //     if (parentRoleMenuItem) {
            //         updatedRoleIds.add(directParentId);
            //     }
            // }

            if (directParentId) {
                // ابتدا بررسی می‌کنیم که آیا والد در لیست وجود دارد یا نه
                if (!roleIds.includes(directParentId)) {
                    updatedRoleIds.add(directParentId); // اضافه کردن والد به لیست
                }
            }
    
            setRoleIds(Array.from(updatedRoleIds));

            const formData = {
                roleId: id,
                applicationMenuId: Array.from(updatedRoleIds),
            };

            console.log(formData)

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
            let updatedRoleIds = roleIds.filter((id) => id !== subId);
            let removeIds = roleMenuId ? [roleMenuId] : []; 

            if (directParentId) {
                const parentRoleMenuItem = roleMenuTools?.data?.data.find(
                    (item: { applicationMenuId: string }) => item.applicationMenuId === directParentId
                );
                const parentRoleMenuId = parentRoleMenuItem ? parentRoleMenuItem.id : null;

                const hasOtherCheckedChildren = roleIds.some((id) => id !== subId && isChildOf(id, directParentId));

                if (parentRoleMenuId && !hasOtherCheckedChildren) {
                    removeIds.push(parentRoleMenuId); 
                    updatedRoleIds = updatedRoleIds.filter((id) => id !== directParentId); 
                }
            }

            deleteMenu.mutate(removeIds, {
                onSuccess: (message) => {
                    if (message.succeeded) {
                        EnqueueSnackbar("عدم دسترسی منو با موفقیت انجام شد", "info");
                        setRoleIds(updatedRoleIds); 
                    } else {
                        EnqueueSnackbar(message?.data.Message, "error");
                    }
                    roleMenuTools.refetch();
                },
            });

            setRoleIds(updatedRoleIds);
        }
    };

    // Helper function to check if a given childId is a child of a parentId
    const isChildOf = (childId: string, parentId: string): boolean => {
        // Recursive function to search for the child in the parent's subtree
        const searchChild = (nodes: any[]): boolean => {
            for (let node of nodes) {
                if (node.id === parentId) {
                    // If the parentId matches the current node, search its children
                    return node.children?.some((child: any) => {
                        if (child.id === childId) {
                            return true; // childId is directly under parentId
                        }
                        // Recursively check in deeper levels of the tree
                        return searchChild(child.children || []);
                    });
                }
                // Continue searching through the entire tree
                if (node.children) {
                    if (searchChild(node.children)) {
                        return true;
                    }
                }
            }
            return false;
        };

        return searchChild(appAllMenu?.data || []); // Start searching from the root of the menu tree
    };


    // Helper function to recursively get all child IDs
    const getAllChildIds = (children: any[]): string[] => {
        let childIds: string[] = [];
        children.forEach((child) => {
            childIds.push(child.id);
            if (child.children && child.children.length > 0) {
                childIds = childIds.concat(getAllChildIds(child.children));
            }
        });
        return childIds;
    };


    if (isLoading) {
        return <Backdrop loading={isLoading} />;
    }


    const renderTreeItems = (nodes: any, directParentId: string | null = null) => (
        <TreeItem key={nodes.id} itemId={nodes.id} label={
            <div className="flex items-center">
                {Array.isArray(nodes.children) && nodes.children.length === 0 && (
                    <FormControlLabel
                        control={
                            <Switch
                                name="applicationMenuId"
                                onChange={(event) => {
                                    const checked = event.target.checked;
                                    handleCheckboxChange(
                                        nodes.id,
                                        checked,
                                        directParentId
                                    );
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
                nodes.children.map((sub: any) => renderTreeItems(sub, nodes.id)) // ارسال applicationMenuId والد
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
