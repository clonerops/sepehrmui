import { Box, Button, Typography } from "@mui/material"
import CustomizedAccordions from "../../../_cloner/components/Accordion"
import { Link } from "react-router-dom"
import GroupForm from "./GroupForm"

const RoleGroups = () => {
  return (
    <>
      <Box component="div" className="flex justify-end mb-4">
        <Link to={"/dashboard/roles/groups/form"}>
          <Button color="secondary" variant="contained">
            <Typography>ایجاد گروه جدید</Typography>
          </Button>
        </Link>
      </Box>
        <CustomizedAccordions content={<GroupForm />} />
    </>
  )
}

export default RoleGroups