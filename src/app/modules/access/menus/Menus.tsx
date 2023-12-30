import { Box, FormControlLabel, Switch, Typography } from "@mui/material"
import { useDeleteRoleMenu, useGetAllApplicationMenus, useGetRoleMenusById, usePostRoleMenus } from "./_hooks"
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Form, Formik } from "formik";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions";
import { IRoleMenu } from "./_models";

const initialValues: IRoleMenu = {
    roleId: "",
    applicationMenuId: [],
  };
  
type Props = {
    id: string
}

const Menus = (props: Props) => {
    const {id} = props;
    const { data: appAllMenu, isLoading: allMenuLoading } = useGetAllApplicationMenus();
    const [searchParams] = useSearchParams();
    
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
    

    console.log(roleMenuTools?.data?.data)


    const handleCheckboxChange = (roleMenuId: string, subId: string, checked: boolean) => {
        if (checked) {
            setRoleIds((prevIds) => [...prevIds, subId]);
            const formData = {
                roleId: id,
                applicationMenuId: [...roleIds, subId],
            };
            console.log("formData", JSON.stringify(formData));
            
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
            console.log(filterRoleMenuId)
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

  return (
    <>
        <Box sx={{ minHeight: 180, flexGrow: 1}}>
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {appAllMenu?.data?.map((item: {id: string, description: string, children: any[]}) => (
                <TreeItem className="my-4" nodeId={item.id} label={item.description}>
                    <Box>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                {({ handleSubmit }) => {
                    return (
                        <Form>
                            <Box
                                component="div"
                                className="grid grid-cols-2 md:grid-cols-4 p-8"
                            >
                            {item?.children?.map((sub: any) => {
                                        return (
                                            <Box
                                                component="div"
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
                                            </Box>
                                        );
                            })}

                                
                                {/* {allMenuLoading || roleMenuTools?.isLoading ? <Typography>درحال بارگزاری ...</Typography> : appAllMenu?.data.map((i: any) => {
                                    return 
                                })} */}
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

export default Menus