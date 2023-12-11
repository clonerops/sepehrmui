import { Box, Button, Typography } from "@mui/material"
import CustomizedAccordions from "../../../_cloner/components/Accordion"
import { Link } from "react-router-dom"

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
        <CustomizedAccordions />
    </>
  )
}

export default RoleGroups