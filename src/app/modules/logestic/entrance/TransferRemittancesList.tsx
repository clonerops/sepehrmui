import { Button, Typography } from "@mui/material"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { useGetTransferRemitancesByMutation } from "../core/_hooks"
import { billlandingColumns } from "./_columns"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { Search, Visibility } from "@mui/icons-material"
import Backdrop from "../../../../_cloner/components/Backdrop"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

const TransferRemitancesList = () => {
  const transferList = useGetTransferRemitancesByMutation()
  useEffect(() => {
    const filter = {}
    transferList.mutate(filter)
  }, [])

  const renderAction = (params: any) => {
    return <Link to={`/dashboard/transferRemittance/${params.row.id}`}>
          <Button variant="contained" color="secondary" onClick={() => { }}>
            <Typography className="px-2" color="primary">صدور مجوز ورود</Typography>
          </Button>
    </Link>
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
                }} onSubmit={() => {}}>
                    {({values}) => {
                        return (
                            <form>
                                <div
                                    className="flex gap-4 w-[50%] mb-4"
                                >
                                    <FormikInput
                                        name="id"
                                        label="شماره حواله"
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
          columns={billlandingColumns(renderAction)}
          rows={transferList?.data?.data || [{}]}
          data={transferList?.data?.data || [{}]}
        />
      </ReusableCard>
    </>
  )
}

export default TransferRemitancesList