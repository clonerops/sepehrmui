import {
    Box,
    Card,
    Chip,
    Container,
    IconButton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import {
    useDeleteUserRole,
    useGetRoles,
    useGetUserRole,
    usePostUserRole,
} from "../../access/roles/core/_hooks";
import { IRole, IUpdateRole, IUserRole } from "../../access/roles/core/_models";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Backdrop from "../../../../_cloner/components/Backdrop";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { Add, Close, Done } from "@mui/icons-material";

const RoleUser = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { data, refetch } = useGetUserRole();
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
                    {new URLSearchParams(searchParams).get("name")}
                </Typography>
                <Box className="pt-8">
                    <Typography variant="h2" className="pb-8">گروه ها</Typography>
                        <Chip
                            label={<Typography>فروشندگان نبشی</Typography>}
                            onClick={() => {}}
                            onDelete={() => {}}
                            deleteIcon={<Add className="!text-cyan-600" />}
                        />
                </Box>
            </ReusableCard>
        </>
    );
};

export default RoleUser;
