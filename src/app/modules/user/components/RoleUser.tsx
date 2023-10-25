import {
  Box,
  Card,
  Container,
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
} from "../../role/core/_hooks";
import { IRole, IUpdateRole, IUserRole } from "../../role/core/_models";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Backdrop from "../../../../_cloner/components/Backdrop";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import ReusableCard from "../../../../_cloner/components/ReusableCard";

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
            setSnackePostOpen(true)
            rolesListTools.refetch()
            window.location.reload()
          }
        })
      } else {
        deleteMutate(query, {
          onSuccess: () => {
            rolesListTools.refetch()
            setSnackeDeleteOpen(true)
            window.location.reload()
          }
        })
      }
      queryClient.invalidateQueries(['roles']);
    } catch (e) {
      return e;
    }
  };
  
  return (
    <>
      {snackePostOpen && (<PositionedSnackbar open={snackePostOpen} setState={setSnackePostOpen} title={postResponse?.data?.Message || postResponse?.message} />)}
      {snackeDeleteOpen && (<PositionedSnackbar open={snackeDeleteOpen} setState={setSnackeDeleteOpen} title={deleteResponse?.data?.Message || deleteResponse?.data?.message || deleteResponse?.message} />)}
      <Container>
        <ReusableCard>
          <Typography variant="h2" color="primary">
            {"نقش"}: {new URLSearchParams(searchParams).get("name")}
          </Typography>
          <Box component="div" className="pt-8">
            <TableContainer>
              <Table>
                <TableHead className="bg-slate-200">
                  <TableRow>
                    <TableCell className="font-poppins_bold">
                      عملیات
                    </TableCell>
                    <TableCell className="font-poppins_bold">
                      نقش
                    </TableCell>
                    <TableCell className="font-poppins_bold">
                      توضیحات
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rolesListTools?.data?.map((item: IRole) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <Switch
                            onChange={(_, checked) =>
                              onUpdateStatus(item, checked)
                            }
                            checked={data?.data?.find((node: IUserRole) => (node.roleId === item?.id) && (node.userId === id))}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {
                            data?.data?.find(
                              (node: IUserRole) => node.roleName === item?.name,
                            )?.roleDesc
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </ReusableCard>
      </Container>
    </>
  );
};

export default RoleUser;
