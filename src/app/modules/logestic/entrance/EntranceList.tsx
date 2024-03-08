import { Button, IconButton, Typography } from "@mui/material"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { useGetTransferRemitancesByMutation } from "../core/_hooks"
import { billlandingColumns, entranceColumns } from "./_columns"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { Edit, Search, Visibility } from "@mui/icons-material"
import Backdrop from "../../../../_cloner/components/Backdrop"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { useEffect } from "react"

const EntranceList = () => {
  const transferList = useGetTransferRemitancesByMutation()
  useEffect(() => {
    const filter = {}
    transferList.mutate(filter)
  }, [])

  const renderAction = (params: any) => {
    return <div className="flex gap-x-4">
      <Link to={`/dashboard/entranceLading/${params.row.id}`}>
        <Button variant="contained" color="secondary">
          <Visibility />
          <Typography className="px-2">صدور مجوز بارگیری</Typography>
        </Button>
      </Link>
    </div>
  }
  const handleFilter = (values: any) => {
    let formData = {
      id: values.id ? values.id : "",
    };
    transferList.mutate(formData);
  }
  return (
    <>
      {transferList.isLoading && <Backdrop loading={transferList.isLoading} />}
      <ReusableCard>
        <Formik initialValues={{
          id: "",
        }} onSubmit={() => { }}>
          {({ values }) => {
            return (
              <form>
                <div
                  className="flex gap-4 w-[50%] mb-4"
                >
                  <FormikInput
                    name="id"
                    label="شماره ورود"
                  />
                  <ButtonComponent onClick={() => handleFilter(values)}>
                    <Search className="text-white" />
                    <Typography className="px-2 text-white">جستجو</Typography>
                  </ButtonComponent>
                </div>
              </form>
            );
          }}
        </Formik>

        <MuiDataGrid
          columns={entranceColumns(renderAction)}
          rows={transferList?.data?.data || [{}]}
          data={transferList?.data?.data || [{}]}
        />
      </ReusableCard>
    </>
  )
}

export default EntranceList