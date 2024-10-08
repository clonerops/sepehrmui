import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { AddTask, AdfScanner, DesignServices, TextDecrease } from '@mui/icons-material'
import _ from 'lodash'

import { IType } from "./_models"
import { useDeleteTypes, useGetTypes, useUpdateTypes } from './_hooks'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import { ProductTypesColumn } from '../../../_cloner/helpers/columns'

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/fuse"
import DeleteGridButton from '../../../_cloner/components/DeleteGridButton'
import SwitchComponent from '../../../_cloner/components/Switch'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import EditGridButton from '../../../_cloner/components/EditGridButton'
import TransitionsModal from '../../../_cloner/components/ReusableModal'
import Backdrop from '../../../_cloner/components/Backdrop'
import ProductTypeForm from './ProductTypeForm'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'

const ProductTypes = () => {

  const typeTools = useGetTypes()
  const updateTypeTools = useUpdateTypes()
  const deleteTypeTools = useDeleteTypes()

  const [results, setResults] = useState<IType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [itemForEdit, setItemForEdit] = useState<IType | undefined>();


  useEffect(() => {
    setResults(typeTools?.data?.data);
     // eslint-disable-next-line
  }, [typeTools?.data?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteTypeTools.mutate(id, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          typeTools.refetch();
        },
      });
  }

  const handleEdit = (item: IType | undefined) => {
    setIsOpen(true);
    setItemForEdit(item);
  };

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        desc: rowData.row.desc,
        image: rowData.row.image,
        isActive: !rowData.row.isActive
      }
      updateTypeTools.mutate(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          typeTools.refetch();
        }
      })
    } catch (e) {
      return e;
    }
  };

  const renderSwitch = (item: any) => {
    return (
      <SwitchComponent
        checked={item?.row.isActive}
        onChange={(_) => onUpdateStatus(item)}
      />
    );
  };

  const renderAction = (item: any) => {
    return (
      <Box component="div" className="flex gap-4">
        <EditGridButton onClick={() => handleEdit(item?.row)} />
        <DeleteGridButton onClick={() => handleDelete(item?.row.id)} />
      </Box>
    );
  };

  return (
    <>
      {typeTools.isLoading && <Backdrop loading={typeTools.isLoading} />}
      {updateTypeTools.isLoading && <Backdrop loading={updateTypeTools.isLoading} />}
      {deleteTypeTools.isLoading && <Backdrop loading={deleteTypeTools.isLoading} />}

      <Box className="flex flex-col lg:flex-row gap-4 mb-4">
        <CardWithIcons
          title='تعداد نوع کالا های ثبت شده'
          icon={<DesignServices className="text-white" />}
          value={typeTools?.data?.data?.length}
          iconClassName='bg-[#3322D8]' />
        <CardWithIcons
          title='تعداد نوع کالا ها در وضعیت فعال'
          icon={<AddTask className="text-white" />}
          value={_.filter(typeTools?.data?.data, 'isActive').length}
          iconClassName='bg-[#369BFD]' />
        <CardWithIcons
          title='تعداد نوع کالا ها در وضعیت غیرفعال'
          icon={<TextDecrease className="text-white" />}
          value={_.filter(typeTools?.data?.data, (item) => !item.isActive).length}
          iconClassName='bg-[#F8B30E]' />
        <CardWithIcons
          title='تعداد نوع کالا های ثبت امروز'
          icon={<AdfScanner className="text-white" />}
          value={0}
          iconClassName='bg-[#EB5553]' />
      </Box>

      <ReusableCard>
        <Box component="div" className="md:grid md:grid-cols-2 md:gap-x-4">
          <Box component="div" className=''>
            <Box className="md:flex md:justify-between md:items-center gap-x-4 space-y-2 mb-4">
              <Box component="div" className=''>
                <FuzzySearch
                  keys={[
                    "id",
                    "desc",
                  ]}
                  data={typeTools?.data?.data}
                  setResults={setResults}
                />
              </Box>
              <Box component="div" className="mt-2 md:mt-0">
                <ButtonComponent onClick={() => setIsCreateOpen(true)}>
                  <Typography className="px-2 text-white">
                    ایجاد نوع کالا
                  </Typography>
                </ButtonComponent>
              </Box>

            </Box>
            <MuiDataGrid
              columns={ProductTypesColumn(renderAction, renderSwitch)}
              rows={results}
              data={typeTools?.data?.data}
              onDoubleClick={(item: any) => handleEdit(item?.row)}
            />
          </Box>
          <Box component="div">
            <Box
              component="div"
              className="hidden md:flex md:justify-center md:items-center"
            >
              <Box component="img"
                src={toAbsoulteUrl("/media/logos/6075528.jpg")}
                width={400}
              />
            </Box>
          </Box>
        </Box>
      </ReusableCard>
      <TransitionsModal
        open={isCreateOpen}
        isClose={() => setIsCreateOpen(false)}
        title="ایجاد نوع کالا جدید"
        width="50%"
        description="برای ایجاد نوع کالا جدید، لطفاً مشخصات مشتری خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
      >
        <ProductTypeForm
          refetch={typeTools.refetch}
          setIsCreateOpen={setIsCreateOpen}
        />
      </TransitionsModal>
      <TransitionsModal
        open={isOpen}
        isClose={() => setIsOpen(false)}
        width="50%"
        title="ویرایش نوع کالا"
      >
        <ProductTypeForm id={itemForEdit?.id} refetch={typeTools.refetch} />
      </TransitionsModal>
    </>
  )
}

export default ProductTypes