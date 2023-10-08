import { Box, Button, Card, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteRoleMenu,
  useGetApplicationMenus,
  useGetRoleMenus,
  useGetRoles,
  usePostRoleMenus,
} from "./core/_hooks";
import { appMenuConvert, roleConvert } from "./helpers/roleConvert";
import { IRoleMenu } from "./core/_models";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import Backdrop from "../../../_cloner/components/Backdrop";
import { postRoleMenusValidation } from "./validation/validation";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import ReusableTable from "../../../_cloner/components/Tables";

interface Item {
  uniqueRole: string;
  roleName: string;
}

const initialValues: IRoleMenu = {
  roleId: "",
  applicationMenuId: "",
};

const RoleMenu = () => {
  // Fetching
  const { data: roles } = useGetRoles();
  const { data: roleMenus } = useGetRoleMenus();
  const { data: appMenu } = useGetApplicationMenus();
  const { mutate, isLoading, data: postResponse } = usePostRoleMenus();
  const { mutate: deleteMutate, data: delereResponse } = useDeleteRoleMenu();
  // State
  const [results, setResults] = useState<Item[]>(roleMenus?.data);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setResults(roleMenus?.data);
  }, [roleMenus?.data]);

  const columns = [
    { key: "roleId", title: "نقش" },
    { key: "applicationMenuId", title:"منو" },
  ];

  const onSubmit = (values: IRoleMenu) => {
    try {
      mutate(values, {
        onSuccess: (res) => {
          if (res?.succeeded) window.location.reload();
          else setHasError(true);
        },
      });
    } catch (e) {
      setHasError(true);
    }
  };

  const onDelete = (values: IRoleMenu) => {
    try {
      deleteMutate(values?.roleId, {
        onSuccess: (res) => {
          if (res?.succeeded) window.location.reload();
          else setHasError(true);
        },
      });
    } catch (e) {
      setHasError(true);
    }
  };

  const renderActions = (item: IRoleMenu) => {
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
              onClick={() => onDelete(item)}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Container>
      {isLoading && <Backdrop loading={isLoading} />}
      {hasError && (
        <PositionedSnackbar
          open={hasError}
          setState={setHasError}
          title={postResponse?.data?.Message || delereResponse?.data?.Message}
        />
      )}
      <Card className="glassmorphism-card p-8">
        <Typography variant="h2" color="primary">
          مدیریت نقش - منو
        </Typography>
        <Box component="div" className="my-8">
          <Formik<IRoleMenu>
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={postRoleMenusValidation}
          >
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Box component="div" className="flex gap-x-8">
                    <FormikSelect
                      name="roleId"
                      label="Role"
                      boxClassName={"w-2/5"}
                      options={roleConvert(roles)}
                    />
                    <FormikSelect
                      name="applicationMenuId"
                      label="Menu"
                      options={appMenuConvert(appMenu?.data)}
                      boxClassName={"w-2/5"}
                    />
                    <Button
                      type={"submit"}
                      variant="contained"
                      className="w-[250px] h-10 bg-primary text-white "
                    >
                      ایجاد نقش - منو جدید
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
        <FuzzySearch
          keys={["applicationMenuId", "roleId"]}
          data={roleMenus?.data || []}
          setResults={setResults}
          threshold={0.4}
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

export default RoleMenu;
