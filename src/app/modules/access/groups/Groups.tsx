import { Box, Button, Typography } from "@mui/material"
import CustomizedAccordions from "../../../../_cloner/components/Accordion"
import { Link } from "react-router-dom"
import { useDeleteApplicationRoles, useGetApplicationRoles } from "./_hooks"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"
import GroupEditForm from "./GroupEditForm"
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog"
import { useState } from "react"

const RoleGroups = () => {
  const [approve, setApprove] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<string>("")

  const groups = useGetApplicationRoles();
  const deleteGroup = useDeleteApplicationRoles();

  const handleDelete = (id: string) => {
    deleteGroup.mutate(id, {
      onSuccess: (message: any) => {
        if (message.succeeded) {
          validateAndEnqueueSnackbar("گروه با موفقیت حذف گردید.", "info")
          groups.refetch();
          setApprove(false)
        } else {
          validateAndEnqueueSnackbar(message?.data?.Message, "warning")
          setApprove(false)
        }
      },
    });
  };

  const handleOpenApprove = (id: string) => {
    setApprove(true)
    setDeletedId(id)
  }

  return (
    <>
      <Box component="div" className="flex justify-end mb-4">
        <Link to={"/dashboard/roles/groups/form"}>
          <Button color="secondary" variant="contained">
            <Typography>ایجاد گروه جدید</Typography>
          </Button>
        </Link>
      </Box>
      {groups?.data?.data.map((item: { id: string, name: string }) => {
        return <CustomizedAccordions deleteOnClick={() => handleOpenApprove(item.id)} title={item.name} content={<GroupEditForm itemData={item} />} />
      })}
      <ConfirmDialog
        open={approve}
        hintTitle="آیا از حذف مطمئن هستید؟"
        notConfirmText="لغو"
        confirmText={deleteGroup.isLoading ? "درحال پردازش ..." : "تایید"}
        onCancel={() => setApprove(false)}
        onConfirm={() => handleDelete(deletedId)}

      />
    </>
  )
}

export default RoleGroups