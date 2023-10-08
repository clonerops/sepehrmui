import { Box, Button, Card, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { roles } from "./helpers/roleList";
import DeleteIcon from "@mui/icons-material/Delete";
import FormikInput from "../../../_cloner/components/FormikInput";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import ReusableTable from "../../../_cloner/components/Tables";

interface Item {
  uniqueRole: string;
  roleName: string;
}

const initialValues = {
  uniqueRole: "",
  roleName: "",
};

const Roles = () => {
  // State
  const [results, setResults] = useState<Item[]>(roles);

  const columns = [
    { key: "uniqueRole", title: "نقش منحصر به فرد" },
    { key: "roleName", title: "نام نقش" },
  ];

  const renderActions = (item: any) => {
    return (
      <Box component="div" className="tw-flex tw-gap-4">
        <Box
          component="div"
          className="tw-bg-yellow-500 tw-px-4 tw-py-2 tw-cursor-pointer tw-rounded-md"
        >
          <Box
            component="div"
            className="flex items-center gap-x-3  tw-text-white"
          >
            {/* <EditIcon
                            className={"cursor-pointer text-primary"}
                            // onClick={() => handleEdit(item)}
                        /> */}
            <DeleteIcon
              className={"cursor-pointer text-primary"}
              // onClick={() => handleDelete(item?.id)}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Container>
      <Card className="glassmorphism-card p-8">
        <Typography variant="h2" color="primary">
          نقش ها
        </Typography>
        <Box component="div" className="my-8">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}
          >
            {() => {
              return (
                <Form>
                  <Box component="div" className="flex flex-row gap-x-8">
                    <FormikInput name="uniqueRole" label="Unique_Role" />
                    <FormikInput name="roleName" label="Role_Name" />
                  </Box>
                  <Button
                    variant="contained"
                    className="w-[240px] bg-primary text-white px-8 py-2"
                  >
                    ایجاد نقش جدید
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
        <FuzzySearch<Item>
          keys={["uniqueRole", "roleName"]}
          data={roles}
          setResults={setResults}
          threshold={0.3}
        />
        <Box component="div" className="my-4">
          <ReusableTable
            columns={columns}
            data={results}
            isLoading={false}
            isError={false}
            renderActions={renderActions}
          />
        </Box>
      </Card>
    </Container>
  );
};

export default Roles;
