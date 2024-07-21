import { Box, FormControlLabel, Switch, Typography } from "@mui/material"
import { useDeleteRoleMenu, useGetAllApplicationMenus, useGetRoleMenusById, usePostRoleMenus } from "./_hooks"
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {  Formik } from "formik";
import { useEffect, useState } from "react";
import { IRoleMenu } from "./_models";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import Backdrop from "../../../../_cloner/components/Backdrop";

const initialValues: IRoleMenu = {
    roleId: "",
    applicationMenuId: [],
  };
  
type Props = {
    id: string
}

const Menus = (props: Props) => {
    const {id} = props;
    const { data: appAllMenu, isLoading } = useGetAllApplicationMenus();
    
    const postMenu = usePostRoleMenus();
    const deleteMenu = useDeleteRoleMenu();
    const roleMenuTools = useGetRoleMenusById(id);

    const [roleIds, setRoleIds] = useState<string[]>([]);


    useEffect(() => {
        let roleId = roleMenuTools?.data?.data.map((item: {applicationMenuId: string}) => item.applicationMenuId)
        setRoleIds(roleId)
      }, [id, roleMenuTools?.data])
        
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
                        EnqueueSnackbar("دسترسی منو با موفقیت انجام شد", "success")
                    } else {
                        EnqueueSnackbar(res?.data.Message, "error")
                    }
                    roleMenuTools.refetch()
                }
            })
        } else {
            setRoleIds((prevIds) => prevIds.filter((id) => id !== subId));
            const filterRoleMenuId = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === subId)
            deleteMenu.mutate(filterRoleMenuId?.id, {
                onSuccess: (message) => {
                    if(message.succeeded) {
                        EnqueueSnackbar("عدم دسترسی منو با موفقیت انجام شد", "info")
                        
                    } else {
                        EnqueueSnackbar(message?.data.Message, "error")
                    }
                    roleMenuTools.refetch()
                }
            })
        }
    };

    if(isLoading) {
        return  <Backdrop loading={isLoading} />
    }

  return (
    <>
        {postMenu.isLoading && <Backdrop loading={postMenu.isLoading} />}
        {deleteMenu.isLoading && <Backdrop loading={deleteMenu.isLoading} />}
        {roleMenuTools.isLoading && <Backdrop loading={roleMenuTools.isLoading} />}
        <Box sx={{ minHeight: 180, flexGrow: 1}}>
        <SimpleTreeView
            aria-label="file system navigator"
            // defaultCollapseIcon={<ExpandMoreIcon />}
            // defaultExpandIcon={<ChevronRightIcon />}
        >
            {appAllMenu?.data?.map((item: {id: string, description: string, children: any[]}) => (
                // <TreeItem className="my-4" nodeId={item.id} label={`${item.description} ---- ${roleIds.length} منو از ${item?.children?.length} منوی موجود دسترسی داده  شده است`}>
                <TreeItem className="my-4" itemId={item.id} label={`${item.description}`}>
                    <div>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                {({ handleSubmit }) => {
                    return (
                        <form>
                            <div
                                className="grid grid-cols-2 md:grid-cols-4 p-8"
                            >
                            {item?.children?.map((sub: any) => {
                                        return (
                                            <div
                                                className="flex items-center"
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name="applicationMenuId"
                                                            onChange={(event) => {
                                                                const checked = event.target.checked;
                                                                handleCheckboxChange(item.id, sub.id, checked);
                                                            }}
                                                            checked={roleIds.includes(sub.id)}
                                                        />
                                                    }
                                                    label={
                                                        <Typography>
                                                            {sub.description}
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                        );
                            })}

                                
                            </div>
                    </form>
            );
          }}
        </Formik>
                    </div>
                </TreeItem>
            ))}
        </SimpleTreeView>
        </Box>

    </>
  )
}

export default Menus