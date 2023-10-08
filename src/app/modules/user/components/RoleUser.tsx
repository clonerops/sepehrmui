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

const RoleUser = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data } = useGetUserRole();
  const rolesListTools = useGetRoles();
  const {
    mutate: postMutate,
    data: postResponse,
    isLoading: postLoading,
  } = usePostUserRole();
  const {
    mutate: deleteMutate,
    data: deleteResponse,
    isLoading: deleteLoading,
  } = useDeleteUserRole();
  const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
  const onUpdateStatus = (rowData: IRole, checked: boolean) => {
    const query: IUpdateRole = {
      userId: id || "",
      roleId: rowData.id,
    };
    try {
      (checked ? postMutate : deleteMutate)(query, {
        onSuccess: () => {
          setSnackeOpen(true);
          window.location.reload();
        },
      });
    } catch (e) {
      setSnackeOpen(true);
      return e;
    }
  };

  return (
    <>
      {postLoading ||
        (deleteLoading && <Backdrop loading={postLoading || deleteLoading} />)}

      <PositionedSnackbar
        open={snackeOpen}
        setState={setSnackeOpen}
        title={
          deleteResponse?.response?.data?.Message ||
          postResponse?.response?.data?.Message ||
          postResponse?.message
        }
      />

      <Container>
        <Card className="glassmorphism-card p-8">
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
                            checked={data?.data?.find(
                              (node: IUserRole) => node.roleId === item?.id,
                            )}
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
        </Card>
      </Container>
    </>
  );
};

export default RoleUser;
