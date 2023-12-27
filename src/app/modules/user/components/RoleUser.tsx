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
import { useDeleteUserRoles, useGetUserRoles, usePostUserRoles } from "../../access/user-roles/_hooks";
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions";
import { useGetUserDetail } from "../core/_hooks";
import Backdrop from "../../../../_cloner/components/Backdrop";

const RoleUser = () => {
    const { id }: any = useParams();
    const [searchParams] = useSearchParams();
    const groups = useGetApplicationRoles();
    const postUserRole  = usePostUserRoles()
    const deleteUserRole  = useDeleteUserRoles()
    const userRoles = useGetUserRoles(id);

    const onPostUserRole = (roleId: string) => {
        const formData = {
            userId: id,
            roleId: roleId
        }
        postUserRole.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    validateAndEnqueueSnackbar(response.message, "success")
                    userRoles.refetch()
                } else {
                    validateAndEnqueueSnackbar(response.data.Message, "error")
                }
            }
        })
    }
    const onDeleteUserRole = (roleId: string) => {
        const formData = {
            userId: id,
            roleId: roleId
        }
        deleteUserRole.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    validateAndEnqueueSnackbar("دسترسی با موفقیت از کاربر حذف گردید.", "info")
                    userRoles.refetch()
                } else {
                    validateAndEnqueueSnackbar(response.data.Message, "error")
                }
            }
        })
    }

    if(postUserRole.isLoading || deleteUserRole.isLoading) {
        return <Backdrop loading={postUserRole.isLoading || deleteUserRole.isLoading} />
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
                        const hasRole = userRoles?.data?.data.some((node: IUserRole) => node.roleId === item?.id && node.userId === id);
                        return (
                                <Chip
                                    key={item.id}
                                    label={<Typography>{item.name}</Typography>}
                                    onDelete={hasRole ? () => onDeleteUserRole(item.id) : () => onPostUserRole(item.id)}
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
