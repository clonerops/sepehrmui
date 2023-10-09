import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Modal,
  Switch,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ShieldIcon from "@mui/icons-material/Shield";
import { Link } from "react-router-dom";
import { useUsers } from "./core/_hooks";
import { IUser } from "./core/_models";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import ReusableTable from "../../../_cloner/components/Tables";
import CreateUser from "./components/CreateUser";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { columns } from "./helpers/userColumns";

const Users = () => {
  const usersTools = useUsers();
  const [createUserOpen, setCreateUserOpen] = useState<boolean>(false);

  const [results, setResults] = useState<IUser[]>(usersTools?.data);

  useEffect(() => {
    setResults(usersTools?.data);
  }, [usersTools?.data]);

  const renderActions = (item: any) => {
    console.log(item)
    return (
      <Box component="div">
        <Button>
          <EditIcon color="warning" />
        </Button>
        <Link
          to={`/dashboard/user/role/${item.id}?name=${
            item?.row.firstName + "  " + item?.row.lastName
          }`}
        >
          <Button>
            <ShieldIcon color="info" />
          </Button>
        </Link>
        <Switch />
      </Box>
    );
  };

  return (
    <Card className="glassmorphism-card p-8">
      <Container>
        <Typography variant="h2" color="primary">
          کاربران
        </Typography>
        <Box
          component="div"
          className="flex justify-center items-center gap-x-8 py-4"
        >
          <FuzzySearch<IUser>
            keys={[
              "email",
              "userName",
              "firstName",
              "lastName",
              "phoneNumber",
              "description",
            ]}
            data={usersTools?.data}
            setResults={setResults}
            threshold={0.3}
          />
          <Link to={"/dashboard/user/create"}>
            <Button
              variant="contained"
              className="w-[240px] bg-primary text-white px-8 py-2"
            >
              <Typography variant="body1">ایجاد کاربر جدید</Typography>
            </Button>
          </Link>
        </Box>
        <Box component="div">
          <MuiDataGrid
            columns={columns(renderActions)}
            rows={results}
            data={usersTools?.data}
          />
        </Box>
      </Container>
      {/* Create User Modal */}
      <Modal
        open={createUserOpen}
        onClose={() => setCreateUserOpen(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CreateUser />
      </Modal>
    </Card>
  );
};

export default Users;
