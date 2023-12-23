import { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShieldIcon from "@mui/icons-material/Shield";
import { Link } from "react-router-dom";

import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import UserForm from "./components/UserForm";

import { useUsers } from "./core/_hooks";
import { userListColumns } from "./helpers/columns";
import { IUser } from "./core/_models";

const Users = () => {
  const usersTools = useUsers();
  const [createUserOpen, setCreateUserOpen] = useState<boolean>(false);

  const [results, setResults] = useState<IUser[]>(usersTools?.data?.data);

  useEffect(() => {
    setResults(usersTools?.data?.data);
  }, [usersTools?.data?.data]);

  const renderActions = (item: any) => {
    return (
      <Box component="div">
        <Button>
          <EditIcon color="warning" />
        </Button>
        <Link
          to={`/dashboard/user/role/${item.row.id}?name=${
            item?.row.firstName + "  " + item?.row.lastName
          }`}
        >
          <Button>
            <ShieldIcon color="info" />
          </Button>
        </Link>
        {/* <Switch /> */}
      </Box>
    );
  };

  return (
    <ReusableCard>
      <>
        <Box
          component="div"
          className="flex flex-col md:flex-row justify-center items-center gap-x-8 py-4 md:space-y-0 space-y-4 "
        >
          <FuzzySearch<IUser>
            keys={[ "email", "userName", "firstName", "lastName", "phoneNumber", "description"]}
            data={usersTools?.data?.data}
            setResults={setResults}
            threshold={0.3}
          />
            <Button
              onClick={() => setCreateUserOpen(true)}
              variant="contained"
              className="w-[240px] bg-primary text-black font-bold font-boldpx-8 py-2"
            >
              <Typography variant="body1">ایجاد کاربر جدید</Typography>
            </Button>
        </Box>
        <Box component="div">
          <MuiDataGrid
            columns={userListColumns(renderActions)}
            rows={results}
            data={usersTools?.data?.data}
          />
        </Box>
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
    </ReusableCard>
  );
};

export default Users;
