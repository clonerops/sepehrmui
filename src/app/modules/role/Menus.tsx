import { Box, Card, FormControlLabel, Switch, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {
    useDeleteRoleMenu,
    useGetApplicationMenus,
    useGetRoleMenusById,
    usePostRoleMenus,
} from "./core/_hooks";
import { IRoleMenu } from "./core/_models";
import { Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import Backdrop from "../../../_cloner/components/Backdrop";

type Props = {
    items: any;
};
const initialValues: IRoleMenu = {
    roleId: "",
    applicationMenuId: [],
};

const Menus = (props: Props) => {
    const { data: appMenu, isLoading } = useGetApplicationMenus();
    const [roleIds, setRoleIds] = useState<string[]>([]);
    const postMenu = usePostRoleMenus();
    const deleteMenu = useDeleteRoleMenu();
    const roleMenuTools = useGetRoleMenusById(props.items.row.id);

    useEffect(() => {
        let roleId: any = [];

        roleMenuTools?.data?.data?.forEach((item: any) => {
            roleId = roleId.concat(item.applicationMenuId);
        });

        setRoleIds(roleId);
    }, [props.items.row.id, roleMenuTools?.data?.data]);

    const handleCheckboxChange = (roleMenuId: string, subId: string, checked: boolean) => {
        if (checked) {
            setRoleIds((prevIds) => [...prevIds, subId]);
            const formData = {
                roleId: props.items.row.id,
                applicationMenuId: [...roleIds, subId],
            };
            postMenu.mutate(formData, {
                onSuccess: () => {
                    enqueueSnackbar("User Role Menu is Active", {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                }
            })
        } else {
            setRoleIds((prevIds) => prevIds.filter((id) => id !== subId));
            const filterRoleMenuId = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === subId)
            deleteMenu.mutate(filterRoleMenuId.id, {
                onSuccess: (message) => {
                    if(message.succeeded) {
                        enqueueSnackbar("User Role Menu is DeActive", {
                            variant: "success",
                            anchorOrigin: { vertical: "top", horizontal: "center" },
                        });
                    } else {
                        enqueueSnackbar(message?.data.Message, {
                            variant: "error",
                            anchorOrigin: { vertical: "top", horizontal: "center" },
                        });
                    }
                }
            })
        }
    };

    if (roleMenuTools?.isLoading) {
        return <Backdrop loading={roleMenuTools?.isLoading} />
    }
    return (
        <>
        
        <Card className="p-8">
            <Box component="div" className="flex gap-x-4">
                <Typography variant="h2" color="primary">
                    {"اعمال منوها به نقش های کاربری"}:
                </Typography>
                <Typography variant="h2" color="secondary">
                    {props?.items?.row?.name}
                </Typography>
            </Box>
            <Formik initialValues={initialValues} onSubmit={() => {}}>
                {({ handleSubmit }) => {
                    return (
                        <Form>
                            <Box
                                component="div"
                                className="grid grid-cols-2 md:grid-cols-4 p-8"
                            >
                                {appMenu?.data.map((i: any) => {
                                    return i.children.map((sub: any) => {
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
                                                                handleCheckboxChange(i.id, sub.id, checked);
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
                                    });
                                })}
                            </Box>
                            {/* <Box className="flex justify-end">
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    className="w-[250px] h-10 bg-primary text-white "
                                    onClick={() => handleSubmit()}
                                >
                                    {t("Submit")}
                                </Button>
                            </Box> */}
                        </Form>
                    );
                }}
            </Formik>
        </Card>
        </>
    );
};

export default Menus;
