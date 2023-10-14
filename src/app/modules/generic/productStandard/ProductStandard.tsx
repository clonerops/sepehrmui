import { useState, useEffect } from 'react'
import { Box, Button, Card, Switch, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import { IStandard } from "./_models"
import { useDeleteStandards, useGetStandards, usePostStandards, useUpdateStandards } from './_hooks'
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import { columns } from './_columns'
import PositionedSnackbar from '../../../../_cloner/components/Snackbar'
import React from 'react'
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const ProductStandards = () => {
  const { data: standards, refetch, isLoading: StandardLoading } = useGetStandards()
  const { mutate: postStandard, data: postData } = usePostStandards()
  const { mutate: updateStandard, data: updateData } = useUpdateStandards()
  const { mutate: deleteStandard, data: deleteData } = useDeleteStandards()

  const [results, setResults] = useState<IStandard[]>([]);
  const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
  const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
  const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    setResults(standards?.data);
  }, [standards?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteStandard(id, {
        onSuccess: (message: any) => {
          setSnackeDeleteOpen(true);
          refetch();
        },
      });
  }

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        desc: rowData.row.desc,
        isActive: !rowData.row.isActive
      }
      updateStandard(formData, {
        onSuccess: () => {
          setSnackeUpdateOpen(true)
          refetch()
        }
      })
    } catch (e) {
      setSnackeUpdateOpen(true);
      return e;
    }
  };

  const columns = (renderAction: any, renderSwitch: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography>{params.value}</Typography>;
        },
        headerName: 'کد استاندارد', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120
      },
      {
        field: 'desc', renderCell: (params: any) => {
          return <Typography>{params.value}</Typography>;
        },
        headerName: 'استاندارد', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "bg-[#E2E8F0] text-black !font-bold",
        minWidth: 160,
      },
      { headerName: 'عملیات', flex: 1, renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", minWidth: 160 }
    ]
    return col
  }


  const renderSwitch = (item: any) => {
    return (
      <Switch
        checked={item?.row.isActive}
        onChange={(_) => onUpdateStatus(item)}
        color="secondary"
      />
    );
  };

  const renderAction = (item: any) => {
    return (
      <Box component="div" className="flex gap-4">
        <DeleteGridButton onClick={() => handleDelete(item?.row.id)} />
      </Box>
    );
  };

  if (StandardLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {snackePostOpen && (<PositionedSnackbar open={snackePostOpen} setState={setSnackePostOpen} title={postData?.data?.Message || postData?.message} />)}
      {snackeUpdateOpen && (<PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={updateData?.data?.Message || updateData?.message} />)}
      {snackeDeleteOpen && (<PositionedSnackbar open={snackeDeleteOpen} setState={setSnackeDeleteOpen} title={deleteData?.data?.Message || deleteData?.message} />)}
      <Card className="p-4">
        <Box component="div" className="md:grid md:grid-cols-2 md:gap-x-4">
          <Box component="div">
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    desc: values.desc
                  }
                  postStandard(formData, {
                    onSuccess: (message: any) => {
                      setFieldValue('id', message.data.id)
                      refetch();
                      setSnackePostOpen(true)
                    }
                  })
                } catch (error) {
                  setStatus("اطلاعات ثبت استاندارد نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className="mb-4">
                  <Box component="div" className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد استاندارد " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="desc" label="استاندارد " boxClassName=" mt-2 md:mt-0" />
                    <Button onClick={() => handleSubmit()} variant="contained" color="secondary" className='mt-2 md:mt-0'>
                      <Typography className="px-2">
                        <AddCircleOutline />
                      </Typography>
                    </Button>
                  </Box>
                </Form>
              }}
            </Formik>
            <Box component="div" className="mb-4">
              <FuzzySearch
                keys={[
                  "id",
                  "desc",
                ]}
                data={standards?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </Box>
            <MuiDataGrid
              columns={columns(renderAction, renderSwitch)}
              rows={results}
              data={standards?.data}
            />
          </Box>
          <Box component="div">
            <Box
              component="div"
              className="hidden md:flex md:justify-center md:items-center"
            >
              <Box component="img"
                src={toAbsoulteUrl("/media/logos/2150531047.jpg")}
              />
            </Box>

          </Box>
        </Box>
      </Card>
    </>
  )
}

export default ProductStandards