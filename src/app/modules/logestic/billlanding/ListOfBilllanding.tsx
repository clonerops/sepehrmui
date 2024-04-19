import { IconButton, Tooltip, Typography } from "@mui/material"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { useGetTransferRemitancesByMutation } from "../core/_hooks"
import { billlandingColumns } from "./_columns"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { Edit, Search, Visibility } from "@mui/icons-material"
import Backdrop from "../../../../_cloner/components/Backdrop"
import { Link, useNavigate } from "react-router-dom"
import { Formik } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { useEffect, useState } from "react"
import Pagination from "../../../../_cloner/components/Pagination"
import { useGetTransferRemittanceStatus } from "../../generic/_hooks"
import RadioGroup from "../../../../_cloner/components/RadioGroup"
import { dropdownTransferRemittanceStatus } from "../helpers/dropdowns"

const pageSize = 100

const ListOfBilllanding = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(1);

  const transferRemittanceStatus = useGetTransferRemittanceStatus()
  const transferList = useGetTransferRemitancesByMutation()
  useEffect(() => {
    const filter = {
      PageNumber: currentPage,
      PageSize: 100,
    }
    transferList.mutate(filter)
    // eslint-disable-next-line
  }, [currentPage])

  const renderAction = (params: any) => {
    return <div className="flex gap-x-4">
      <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
        <Link to={`/dashboard/billlandingList/${params.row.id}`}>
          <IconButton size="small" color="primary">
            <Visibility />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title={<Typography variant='h3'>ویرایش</Typography>}>
        <Link to={`/dashboard/billlandingEdit/${params.row.id}`}>
          <IconButton size="small" color="secondary">
            <Edit />
          </IconButton>
        </Link>
      </Tooltip>
    </div>
  }
  const handleFilter = (values: any) => {
    let formData = {
      id: values.id ? values.id : "",
      PageNumber: currentPage,
      PageSize: 100,
    };
    transferList.mutate(formData);
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleChangeStatus = (id: number) => {
    let formData = {
      PageNumber: currentPage,
      PageSize: 100,
      TransferRemittStatusId: id,
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
                <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[50%] mb-4">
                  <FormikInput
                    name="id"
                    label="شماره حواله"
                  />
                  <ButtonComponent onClick={() => handleFilter(values)}>
                    <Search className="text-white" />
                    <Typography className="px-2 text-white">جستجو</Typography>
                  </ButtonComponent>
                </div>
                <div className="mb-4">
                  <RadioGroup
                    key="TransferRemittStatusId"
                    disabled={false}
                    categories={
                      transferRemittanceStatus?.data === undefined
                        ? [{ value: null, title: "همه", defaultChecked: true }]
                        : dropdownTransferRemittanceStatus([
                          { id: null, statusDesc: "همه", defaultChecked: true },
                          ...transferRemittanceStatus?.data,
                        ])
                    }
                    name="TransferRemittStatusId"
                    id="TransferRemittStatusId"
                    onChange={(id: number) => handleChangeStatus(id)}
                  />
                </div>
              </form>
            );
          }}
        </Formik>

        <MuiDataGrid
          columns={billlandingColumns(renderAction)}
          rows={transferList?.data?.data || [{}]}
          data={transferList?.data?.data || [{}]}
          onDoubleClick={(item: any) => navigate(`/dashboard/billlandingEdit/${item.row.id}`)}
          hideFooter={true}
        />
        <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
      </ReusableCard>

    </>
  )
}

export default ListOfBilllanding