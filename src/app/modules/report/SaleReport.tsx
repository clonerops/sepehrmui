import { Formik } from 'formik'
import { useEffect } from 'react'

import FormikDatepicker from '../../../_cloner/components/FormikDatepicker'
import FormikAmount from '../../../_cloner/components/FormikAmount'
import FormikType from '../../../_cloner/components/FormikType'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'

import { Typography } from '@mui/material'
import { VerticalCharts } from '../../../_cloner/components/VerticalCharts'
import { useGetSaleReport } from './_hooks'
import { ISaleReportFilter } from './_models'

const initialValues: ISaleReportFilter = {
    FromDate: "",
    ToDate: "",
    ProductTypeId: ""
}

const SaleReport = () => {
    
    const reportTools = useGetSaleReport()

    const FilteredTools = (values: ISaleReportFilter) => {
        reportTools.mutate(values)
    }

    useEffect(() => {
        const filters = {
            FromDate: "",
            ToDate: "",
            ProductTypeId: ""        
        }
        reportTools.mutate(filters)
         // eslint-disable-next-line
    }, [])


    if(reportTools.isLoading) {
        return <Typography variant='h3'>درحال بارگزاری ...</Typography>
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={FilteredTools}>
                {({ handleSubmit }) => <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        <FormikDatepicker name="FromDate" label='از تاریخ' />
                        <FormikDatepicker name="ToDate" label='تا تاریخ' />
                        <FormikType name="ProductTypeId" label="نوع کالا" />
                    </div>
                    <div className='flex justify-end items-end my-4'>
                        <ButtonComponent onClick={() => handleSubmit()}>
                            <Typography className='text-white'>جستجو</Typography>
                        </ButtonComponent>
                    </div>
                </form>}
            </Formik>

            <div>
                <VerticalCharts
                    text='گزارش فروش براساس نوع کالا'
                    categories={reportTools?.data?.data.map((item: {productTypeDesc: string}) => item.productTypeDesc) || [{}]}
                    data={reportTools?.data?.data.map((item: {saleAmount: string}) => item.saleAmount) || [{}]}
                />

            </div>
        </>
    )
}

export default SaleReport