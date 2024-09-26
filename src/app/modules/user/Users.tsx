import { useEffect, useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShieldIcon from "@mui/icons-material/Shield";
import { Link } from "react-router-dom";

import FuzzySearch from "../../../_cloner/helpers/fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import UserForm from "./components/UserForm";
import Backdrop from "../../../_cloner/components/Backdrop";

import { useUsers } from "./core/_hooks";
import { IUser } from "./core/_models";
import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";
import { UserListColumn } from "../../../_cloner/helpers/columns";
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../routing/AccessDenied";

const Users = () => {

  const { hasPermission } = useAuth()

  const usersTools = useUsers();
  const [createUserOpen, setCreateUserOpen] = useState<boolean>(false);
  const [updateUserOpen, setUpdateUserOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<string>("")

  const [results, setResults] = useState<IUser[]>(usersTools?.data?.data);

  useEffect(() => {
    setResults(usersTools?.data?.data);
    // eslint-disable-next-line
  }, [usersTools?.data?.data]);


  const onHandleUpdateModal = (rowId: string) => {
    setUpdateUserOpen(true)
    setRowId(rowId)
  }

  const renderActions = (item: { row: { id: string, firstName: string, lastName: string } }) => {
    return (
      <>
        <Button onClick={() => onHandleUpdateModal(item.row.id)}>
          <EditIcon color="warning" />
        </Button>
        <Link
          to={`/dashboard/user/role/${item.row.id}?name=${item?.row.firstName + "  " + item?.row.lastName
            }`}
        >
          <Button>
            <ShieldIcon color="info" />
          </Button>
        </Link>
        {/* <Switch /> */}
      </>
    );
  };

  if (!hasPermission("CreateUser"))
    return <AccessDenied />
    
  return (
    <>
      {usersTools.isLoading && <Backdrop loading={usersTools.isLoading} />}
      <ReusableCard>
        <>
          <div className="flex flex-col md:flex-row justify-center items-center gap-x-8 py-4 md:space-y-0 space-y-4 ">
            <FuzzySearch<IUser>
              keys={["email", "userName", "firstName", "lastName", "phoneNumber", "description"]}
              data={usersTools?.data?.data}
              setResults={setResults}
            />
            <Button
              onClick={() => setCreateUserOpen(true)}
              variant="contained"
              className="w-[240px] bg-primary text-black font-bold font-boldpx-8 py-2"
            >
              <Typography variant="body1">ایجاد کاربر جدید</Typography>
            </Button>
          </div>
          <div className="md:grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <div className="md:col-span-3">
              <MuiDataGrid
                columns={UserListColumn(renderActions)}
                rows={results}
                data={usersTools?.data?.data}
                isLoading={usersTools.isLoading}
                onDoubleClick={(item: any) => onHandleUpdateModal(item.row.id)}
              />
            </div>
            {/* <div className="md:flex md:justify-center md:items-center hidden">
              <img alt="sepehriranian" src={toAbsoulteUrl('/media/images/566.jpg')} width={400} height={400} />
            </div> */}
          </div>
        </>
        {/* Create User Modal */}
        {createUserOpen &&
          <Modal
            open={createUserOpen}
            onClose={() => setCreateUserOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserForm onClose={() => setCreateUserOpen(false)} refetchUser={usersTools.refetch} />
          </Modal>
        }
        {updateUserOpen &&
          <Modal
            open={updateUserOpen}
            onClose={() => setUpdateUserOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserForm onClose={() => setUpdateUserOpen(false)} refetchUser={usersTools.refetch} id={rowId} />
          </Modal>
        }
      </ReusableCard>
    </>
  );
};

export default Users;
