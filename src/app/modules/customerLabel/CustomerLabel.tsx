import { useState, useEffect } from 'react'
import { Button, Typography } from "@mui/material"
import { Add } from '@mui/icons-material'

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/fuse"
import ReusableCard from '../../../_cloner/components/ReusableCard'
import Backdrop from '../../../_cloner/components/Backdrop'

import { ICustomerLabel } from "./_models"
import { useGetCustomerLabels } from './_hooks'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'
import { CustomerLabelsColumn } from '../../../_cloner/helpers/columns'

import TransitionsModal from '../../../_cloner/components/ReusableModal'
import CustomerLabelForm from './CustomerLabelForm'
import EditGridButton from '../../../_cloner/components/EditGridButton'


const CustomerLabels = () => {
  const { data: CustomerLabels, refetch, isLoading: CustomerLabelLoading } = useGetCustomerLabels()

  const [results, setResults] = useState<ICustomerLabel[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [itemForEdit, setItemForEdit] = useState<ICustomerLabel>();

  useEffect(() => {
    setResults(CustomerLabels?.data);
    // eslint-disable-next-line
  }, [CustomerLabels?.data]);


  const handleEdit = (item: ICustomerLabel) => {
    setItemForEdit(item);
    setIsEditOpen(true);
};


  const renderAction = (item: any) => {
    return (
      <div>
        <EditGridButton onClick={() => handleEdit(item?.row)} />
      </div>
    );
  };


  if (CustomerLabelLoading) {
    return <Backdrop loading={CustomerLabelLoading} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReusableCard >
          <div>
            <div className="md:flex md:justify-between md:items-center space-y-2" >
              <div className="w-auto md:w-[40%] mb-2">
                <FuzzySearch
                  keys={[
                    "customerLabelTypeDesc",
                    "labelName"
                  ]}
                  data={CustomerLabels?.data}
                  setResults={setResults}
                />
              </div>
              <Button
                onClick={() => setIsCreateOpen(true)}
                variant="contained"
                className="!bg-indigo-500 hover:!bg-indigo-700"
              >
                <Add className="text-white" />
                <Typography variant="h4" className="text-white">ایجاد برچسب جدید</Typography >
              </Button>
            </div>
            <MuiDataGrid
              columns={CustomerLabelsColumn(renderAction)}
              rows={results}
              data={CustomerLabels?.data}
              onDoubleClick={(item: any) => handleEdit(item)}
              getRowId={(item: { id: number }) => item.id}
            />
          </div>
        </ReusableCard>
        <ReusableCard cardClassName='lg:flex gap-4 hidden'>
          <div>
            <div className="hidden lg:flex lg:justify-center lg:items-center"
            >
              <img alt="sepehriranian"
                src={toAbsoulteUrl("/media/logos/11089.jpg")}
                width={400}
              />
            </div>

          </div>
        </ReusableCard>
      </div>
      <TransitionsModal
        open={isCreateOpen}
        isClose={() => setIsCreateOpen(false)}
        title="ایجاد برچسب جدید"
        description="برای ایجاد برچسب جدید، لطفاً مشخصات برچسب خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
      >
        <CustomerLabelForm
          refetch={refetch}
          onClose={() => setIsCreateOpen(false)}
        />
      </TransitionsModal>
      <TransitionsModal
        open={isEditOpen}
        isClose={() => setIsEditOpen(false)}
        title="ویرایش برچسب"
        description="برای ویرایش برچسب لطفاً مشخصات برچسب خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
      >
        <CustomerLabelForm
          refetch={refetch}
          id={itemForEdit?.id || 0}
          onClose={() => setIsEditOpen(false)}
        />
      </TransitionsModal>

    </>
  )
}

export default CustomerLabels