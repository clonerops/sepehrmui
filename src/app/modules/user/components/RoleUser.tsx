import { Box, Chip, Stack, Typography } from "@mui/material";

import {
    useDeleteUserRole,
    useGetRoles,
    useGetUserRole,
    usePostUserRole,
} from "../../access/roles/core/_hooks";
import { IRole, IUpdateRole, IUserRole } from "../../access/roles/core/_models";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import { useQueryClient } from "@tanstack/react-query";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { Add, Close } from "@mui/icons-material";
import { useGetApplicationRoles } from "../../access/groups/_hooks";

const RoleUser = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const groups = useGetApplicationRoles();
    const rolesListTools = useGetRoles();
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

    const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
    const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);

    const onUpdateStatus = (rowData: IRole, checked: boolean) => {
        const query: IUpdateRole = {
            userId: id || "",
            roleId: rowData.id,
        };
        try {
            if (checked) {
                postMutate(query, {
                    onSuccess: () => {
                        setSnackePostOpen(true);
                        rolesListTools.refetch();
                        window.location.reload();
                    },
                });
            } else {
                deleteMutate(query, {
                    onSuccess: () => {
                        rolesListTools.refetch();
                        setSnackeDeleteOpen(true);
                        window.location.reload();
                    },
                });
            }
            queryClient.invalidateQueries(["roles"]);
        } catch (e) {
            return e;
        }
    };

    return (
        <>
            {snackePostOpen && (
                <PositionedSnackbar
                    open={snackePostOpen}
                    setState={setSnackePostOpen}
                    title={postResponse?.data?.Message || postResponse?.message}
                />
            )}
            {snackeDeleteOpen && (
                <PositionedSnackbar
                    open={snackeDeleteOpen}
                    setState={setSnackeDeleteOpen}
                    title={
                        deleteResponse?.data?.Message ||
                        deleteResponse?.data?.message ||
                        deleteResponse?.message
                    }
                />
            )}
            <ReusableCard>
                <Typography variant="h1" color="primary">
                    نام کاربری: {new URLSearchParams(searchParams).get("name")}
                </Typography>
                <Box className="pt-8">
                    <Typography variant="h2" className="pb-8">
                        گروه ها
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        {groups?.data?.data.map(
                            (item: { id: string; name: string }) => (
                                <Chip
                                    label={<Typography>{item.name}</Typography>}
                                    onClick={() => {}}
                                    onDelete={() => {}}
                                    className="m-2"
                                    deleteIcon={
                                        <Add className="!text-cyan-600" />
                                    }
                                />
                            )
                        )}
                    </Stack>
                </Box>
            </ReusableCard>
        </>
    );
};

export default RoleUser;
