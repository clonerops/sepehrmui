import { Formik } from 'formik'
import { useEffect } from 'react'

import FormikDatepicker from '../../../_cloner/components/FormikDatepicker'
import FormikAmount from '../../../_cloner/components/FormikAmount'
import FormikType from '../../../_cloner/components/FormikType'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'

import { Typography } from '@mui/material'
import { VerticalCharts } from '../../../_cloner/components/VerticalCharts'
import { useGetSaleReportByProductType, useGetSaleStatusDiagram } from './_hooks'
import { IReportFilter } from './_models'
import Backdrop from '../../../_cloner/components/Backdrop'
import { LineCharts } from '../../../_cloner/components/LineChart'
import moment from 'moment-jalaali'

const initialValues: IReportFilter = {
    FromDate: moment(new Date()).subtract(1, 'months').format('jYYYY/jMM/jDD'),
    ToDate: moment(new Date()).format('jYYYY/jMM/jDD'),
    ProductTypeId: ""
}

const SaleStatusDiagram = () => {
    
    const reportTools = useGetSaleStatusDiagram()

    const FilteredTools = (values: IReportFilter) => {
        reportTools.mutate(values)
    }

    useEffect(() => {
        const filters = {
            FromDate: moment(new Date()).subtract(1, 'months').format('jYYYY/jMM/jDD'),
            ToDate: moment(new Date()).format('jYYYY/jMM/jDD'),
            ProductTypeId: ""        
        }
        reportTools.mutate(filters)
         // eslint-disable-next-line
    }, [])


    // if(reportTools.isLoading) {
    //     return <Typography variant='h3'>درحال بارگزاری ...</Typography>
    // }

    return (
        <>
            {reportTools.isLoading && <Backdrop loading={reportTools.isLoading} />}
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
                <LineCharts
                    text='تمودار وضعیت فروش'
                    categories={reportTools?.data?.data.map((item: {saleDate: string}) => item.saleDate) || [{}]}
                    data={reportTools?.data?.data.map((item: {price: string}) => item.price) || [{}]}
                />

            </div>
        </>
    )
}

export default SaleStatusDiagram