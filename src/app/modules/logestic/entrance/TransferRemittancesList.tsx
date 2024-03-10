import { Button, Typography } from "@mui/material"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { useGetTransferRemitancesByMutation } from "../core/_hooks"
import { billlandingColumns } from "./_columns"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { Search } from "@mui/icons-material"
import Backdrop from "../../../../_cloner/components/Backdrop"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { useEffect, useState } from "react"
import Pagination from "../../../../_cloner/components/Pagination"


const pageSize = 20


const TransferRemitancesList = () => {
      const [currentPage, setCurrentPage] = useState<number>(1);

  const transferList = useGetTransferRemitancesByMutation()
  useEffect(() => {
    const filter: any = {
      pageNumber: currentPage,
      pageSize: 100,     
    }
    transferList.mutate(filter)
  }, [currentPage])

  const renderAction = (params: any) => {
    return <Link to={params.row.transferRemittanceStatusId === 2 ? "" : `/dashboard/transferRemittance/${params.row.id}`}>
          <Button variant="contained" color="secondary" disabled={params.row.transferRemittanceStatusId === 2} onClick={() => { }}>
            <Typography className="px-2" color="primary">صدور مجوز ورود</Typography>
          </Button>
    </Link>
  }
  const handleFilter = (values: any) => {
    let formData = {
        id: values.id ? values.id : "",
        pageNumber: currentPage,
        pageSize: 100,          
    };
    transferList.mutate(formData);
}

  const handlePageChange = (selectedItem: { selected: number }) => {
      setCurrentPage(selectedItem.selected + 1);
  };


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
                                    className="flex flex-col lg:flex-row gap-4 w-full lg:w-[50%] mb-4"
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
          hideFooter={true}
          
        />
        <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
      </ReusableCard>
      {/* <Pagination pageCount={+transferList?.totalCount / +pageSize || 100} onPageChange={handlePageChange} /> */}
    </>
  )
}

export default TransferRemitancesList