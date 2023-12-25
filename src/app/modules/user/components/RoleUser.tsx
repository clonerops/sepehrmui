import { Box, Chip, Stack, Typography } from "@mui/material";

import {
    useDeleteUserRole,
    useGetRoles,
    useGetUserRole,
    usePostUserRole,
} from "../../access/roles/core/_hooks";
import { IRole, IUpdateRole, IUserRole } from "../../access/roles/core/_models";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import { useQueryClient } from "@tanstack/react-query";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { Add, Close } from "@mui/icons-material";
import { useGetApplicationRoles } from "../../access/groups/_hooks";
import { usePostUserRoles } from "../../access/user-roles/_hooks";
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions";
import { useGetUserDetail } from "../core/_hooks";

const RoleUser = () => {
    const queryClient = useQueryClient();
    const { id }: any = useParams();
    const [searchParams] = useSearchParams();
    const groups = useGetApplicationRoles();
    const postUserRole  = usePostUserRoles()
    const rolesListTools = useGetRoles();
    const detailTools = useGetUserDetail();
    useEffect(() => {
        detailTools.mutate(id)
    }, [id])

    const {
        mutateAsync: postMutate,
        data: postResponse,
        isLoading: postLoading,
    } = usePostUserRole();
    const {
        mutateAsync: deleteMutate,
        data: deleteResponse,
        isLoading: deleteLoading,
    } = useDeleteUserRole();

    // const onUpdateStatus = (rowData: IRole, checked: boolean) => {
    //     const query: IUpdateRole = {
    //         userId: id || "",
    //         roleId: rowData.id,
    //     };
    //     try {
    //         if (checked) {
    //             postMutate(query, {
    //                 onSuccess: () => {
    //                     setSnackePostOpen(true);
    //                     rolesListTools.refetch();
    //                     window.location.reload();
    //                 },
    //             });
    //         } else {
    //             deleteMutate(query, {
    //                 onSuccess: () => {
    //                     rolesListTools.refetch();
    //                     setSnackeDeleteOpen(true);
    //                     window.location.reload();
    //                 },
    //             });
    //         }
    //         queryClient.invalidateQueries(["roles"]);
    //     } catch (e) {
    //         return e;
    //     }
    // };

    const onPostUserRole = (roleId: string) => {
        const formData = {
            userId: id,
            roleId: roleId
        }
        postUserRole.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    validateAndEnqueueSnackbar(response.message, "info")
                } else {
                    validateAndEnqueueSnackbar(response.response.Message, "error")
                }
            }
        })
    }

    
    return (
        <>
            <ReusableCard>
                <Typography variant="h1" color="primary">
                    نام کاربری: {new URLSearchParams(searchParams).get("name")}
                </Typography>
                <Box className="pt-8">
                    <Typography variant="h2" className="pb-8">
                        گروه ها
                    </Typography>
                    <Stack direction="row" spacing={2}>
                    {groups?.data?.data.map((item: { id: string; name: string }) => {
                        const hasRole = detailTools?.data?.data?.userRoles.some((node: IUserRole) => node.roleId === item?.id && node.userId === id);
                        return (
                                <Chip
                                    key={item.id}
                                    label={<Typography>{item.name}</Typography>}
                                    onDelete={() => onPostUserRole(item.id)}
                                    className="m-2"
                                    deleteIcon={hasRole ? <Close className="!text-red-600" /> : <Add className="!text-cyan-600" />}
                                />
                            );
                        })}               
                    </Stack>
                </Box>
            </ReusableCard>
        </>
    );
};

export default RoleUser;
