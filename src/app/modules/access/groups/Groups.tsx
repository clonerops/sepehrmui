import { Box, Button, Typography } from "@mui/material"
import CustomizedAccordions from "../../../../_cloner/components/Accordion"
import { Link } from "react-router-dom"
import { useDeleteApplicationRoles, useGetApplicationRoles } from "./_hooks"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"
import GroupEditForm from "./GroupEditForm"

const RoleGroups = () => {
  const groups = useGetApplicationRoles();
  const deleteGroup = useDeleteApplicationRoles();

  const handleDelete = (id: string) => {
    deleteGroup.mutate(id, {
        onSuccess: (message: any) => {
            if (message.succeeded) {
              validateAndEnqueueSnackbar("Role is successfully deleted", "info")
              groups.refetch();
            } else {
              validateAndEnqueueSnackbar(message?.data?.Message, "warning")
            }
        },
    });
};

  return (
    <>
      <Box component="div" className="flex justify-end mb-4">
        <Link to={"/dashboard/roles/groups/form"}>
          <Button color="secondary" variant="contained">
            <Typography>ایجاد گروه جدید</Typography>
          </Button>
        </Link>
      </Box>
      {groups?.data?.data.map((item: {id: string, name: string}) => {
        return <CustomizedAccordions deleteOnClick={() => handleDelete(item.id)} title={item.name} content={<GroupEditForm />} />
      })}
    </>
  )
}

export default RoleGroups