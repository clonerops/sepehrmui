import { useEffect, useState } from "react"
import { Formik } from "formik"
import { IconButton, Tooltip, Typography } from "@mui/material"
import { Edit, Search, Visibility } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useGetTransferRemittanceStatus } from "../generic/_hooks"
import { useGetTransferRemitancesByMutation } from "./_hooks"
import { TransferRemittanceColumn } from "../../../_cloner/helpers/columns"

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import ButtonComponent from "../../../_cloner/components/ButtonComponent"
import Backdrop from "../../../_cloner/components/Backdrop"
import FormikInput from "../../../_cloner/components/FormikInput"
import Pagination from "../../../_cloner/components/Pagination"
import RadioGroup from "../../../_cloner/components/RadioGroup"
import { dropdownTransferRemittanceStatus } from "../../../_cloner/helpers/dropdowns"
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions"
import AccessDenied from "../../routing/AccessDenied"

const pageSize = 100

const ListOfTransferRemittance = () => {
  const { hasPermission } = useAuth()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(1);

  const transferRemittanceStatus = useGetTransferRemittanceStatus()
  const transferList = useGetTransferRemitancesByMutation()
  
  useEffect(() => {
    const filter = {
      PageNumber: currentPage,
      PageSize: pageSize,
    }
    transferList.mutate(filter)
    // eslint-disable-next-line
  }, [currentPage])

  const renderAction = (params: any) => {
    return <div className="flex gap-x-4">
      <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
        <Link target="_blank" to={`/dashboard/BilllandingList/${params.row.id}`}>
          <IconButton size="small" color="primary">
            <Visibility />
          </IconButton>
        </Link>
      </Tooltip>
      {hasPermission("TransferRemittance") &&
        <Tooltip title={<Typography variant='h3'>ویرایش</Typography>}>
          <Link target="_blank" to={`/dashboard/BilllandingEdit/${params.row.id}`}>
            <IconButton size="small" color="secondary">
              <Edit />
            </IconButton>
          </Link>
        </Tooltip>
      }
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
      PageSize: pageSize,
      TransferRemittStatusId: id,
    };
    transferList.mutate(formData);
  }

  if (!hasPermission("GetAllTransferRemittances"))
    return <AccessDenied />

  return (
    <>
      {transferList.isLoading && <Backdrop loading={transferList.isLoading} />}
      <ReusableCard>
        <Formik initialValues={{
          id: "",
        }} onSubmit={() => { }}>
          {({ values }) => {
            return (
              <>
                <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[50%] mb-4">
                  <FormikInput name="id" label="شماره حواله" />
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
              </>
            );
          }}
        </Formik>

        <MuiDataGrid
          columns={TransferRemittanceColumn(renderAction)}
          rows={transferList?.data?.data || [{}]}
          data={transferList?.data?.data || [{}]}
          onDoubleClick={(item: any) => navigate(`/dashboard/TransferRemittanceEdit/${item.row.id}`)}
          hideFooter={true}
        />
        <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
      </ReusableCard>

    </>
  )
}

export default ListOfTransferRemittance