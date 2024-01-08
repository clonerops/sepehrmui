import { Box, Button, Typography } from "@mui/material"
import CustomizedAccordions from "../../../../_cloner/components/Accordion"
import { Link } from "react-router-dom"
import { useDeleteApplicationRoles, useGetApplicationRoles } from "./_hooks"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"
import GroupEditForm from "./GroupEditForm"
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog"
import { useState } from "react"
import Backdrop from "../../../../_cloner/components/Backdrop"
import TransitionsModal from "../../../../_cloner/components/ReusableModal"
import GroupForm from "./GroupForm"

const RoleGroups = () => {
  const [approve, setApprove] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<string>("")
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

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

  if(groups.isLoading) {
    return <Backdrop loading={groups.isLoading} />
  }

  return (
    <>
      <Box component="div" className="flex justify-end mb-4">
          <Button onClick={() => setIsCreateOpen(true)} color="secondary" variant="contained">
            <Typography>ایجاد گروه جدید</Typography>
          </Button>
      </Box>
      {groups?.data?.data.map((item: { id: string, name: string }) => {
        return <CustomizedAccordions deleteOnClick={() => handleOpenApprove(item.id)} title={item.name} content={<GroupEditForm itemData={item} />} />
      })}

            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد گروه جدید"
                width="50%"
                description="برای ایجاد 'گروه' جدید، لطفاً نام گروه و توضیحات خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <GroupForm
                    refetch={groups.refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>


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