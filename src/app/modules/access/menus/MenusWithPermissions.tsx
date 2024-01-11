import { Box, FormControlLabel, Switch, Typography } from "@mui/material"
import { useDeleteRoleMenu, useGetAllApplicationMenus, useGetRoleMenusById, usePostRoleMenus } from "./_hooks"
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ExpandMore, ChevronRight } from '@mui/icons-material' 
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions";
import { IRoleMenu } from "./_models";
import { useGetAllPermissionByMenus } from "../permissions/_hooks";
import FileSystemNavigator from "../../../../_cloner/components/TreeView";
import CheckboxGroup from "../../../../_cloner/components/CheckboxGroup";
import { dropdownPermissions, dropdownPermissionsByMenu } from "../permissions/_functions";

const initialValues: IRoleMenu = {
    roleId: "",
    applicationMenuId: [],
  };
  
type Props = {
    id: string
}

const MenusWithPermissions = (props: Props) => {
    const {id} = props;
    const { data: appAllMenu, isLoading: allMenuLoading } = useGetAllPermissionByMenus();
    
    const postMenu = usePostRoleMenus();
    const deleteMenu = useDeleteRoleMenu();
    const roleMenuTools = useGetRoleMenusById(id);

    const [roleIds, setRoleIds] = useState<string[]>([]);

    useEffect(() => {
        let roleId: any = [];
        roleMenuTools?.data?.data?.forEach((item: any) => {
            roleId = roleId.concat(item.applicationMenuId);
        })
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
                    if(res.succeeded) {
                        validateAndEnqueueSnackbar("دسترسی منو با موفقیت انجام شد", "success")
                    } else {
                        validateAndEnqueueSnackbar(res?.data.Message, "error")
                    }
                }
            })
        } else {
            setRoleIds((prevIds) => prevIds.filter((id) => id !== subId));
            const filterRoleMenuId = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === subId)
            deleteMenu.mutate(filterRoleMenuId?.id, {
                onSuccess: (message) => {
                    if(message.succeeded) {
                        validateAndEnqueueSnackbar("عدم دسترسی منو با موفقیت انجام شد", "info")
                        
                    } else {
                        validateAndEnqueueSnackbar(message?.data.Message, "error")
                    }
                }
            })
        }
    };

    if(allMenuLoading) {
        return <Typography>درحال بارگزاری ...</Typography>
    }


  return (
    <>
        <Box sx={{ minHeight: 180, flexGrow: 1}}>
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
        >
            {appAllMenu?.data?.map((item: {applicationMenuId: string, applicationMenuName: string, permissions: any[]}) => (
                <TreeItem className="!my-4  !bg-gray-100 !rounded-lg" nodeId={item.applicationMenuId} label={`${item.applicationMenuName}`}>
                    <Box>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                {({ handleSubmit }) => {
                    return (
                        <Form>
                            <Box
                                component="div"
                                className="w-full"
                            >
                                            <Box
                                                component="div"
                                                className="flex items-center"
                                            >
                                                <FileSystemNavigator content={<Box component="div">
                                                    <CheckboxGroup  options={dropdownPermissionsByMenu(item?.permissions)} label="" name="rolePermissions" boxClassName="grid grid-cols-3 md:grid-cols-4 gap-x-4"/>
                                                </Box>
                                            } />
                                            </Box>
                            </Box>
              </Form>
            );
          }}
        </Formik>
                    </Box>
                </TreeItem>
            ))}
        </TreeView>
        </Box>

    </>
  )
}

export default MenusWithPermissions