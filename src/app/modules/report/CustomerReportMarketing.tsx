import { Formik } from 'formik'
import { Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import { CustomerReportMarketingColumn } from '../../../_cloner/helpers/columns'
import FormikCustomerLabelType from '../../../_cloner/components/FormikCustomerLableType'
import FormikCustomerLabel from '../../../_cloner/components/FormikCustomerLabel'
import RadioGroup from '../../../_cloner/components/RadioGroup'
import { useGetCustomerLabelsByMutation } from '../customerLabel/_hooks'
import { useGetCustomersByMutation } from '../customer/core/_hooks'
import { useState } from 'react'
import TransitionsModal from '../../../_cloner/components/ReusableModal'
import MuiTable from '../../../_cloner/components/MuiTable'
import { ICustomer } from '../customer/core/_models'
import PhonebookGridButton from '../../../_cloner/components/PhonebookGridButton'

const CustomerReportMarketing = () => {
    const customerLabelTools = useGetCustomerLabelsByMutation()
    const customerTools = useGetCustomersByMutation()

    const [isPhoneBookOpen, setIsPhoneBookOpen] = useState<boolean>(false);
    const [itemCustomer, setItemCustomer] = useState<ICustomer>();

    const handleFilter = (values: any) => {
        let formData = {
            CustomerLabelId: values.customerLabelId.value,
            ReportType: values.reportTypeId
        };
        customerTools.mutate(formData)
    }

    const onChangeCustomerLableType = (item: number) => {
        const filter = {
            CustomerLabelTypeId: item
        }
        customerLabelTools.mutate(filter)
    }

    const handleItemCustomer = (item: any) => {
        setItemCustomer(item);
        setIsPhoneBookOpen(true);
    };

    const renderAction = (item: any) => {
        return (
            <div className="flex gap-4">
                <PhonebookGridButton onClick={() => handleItemCustomer(item?.row)} />
            </div>
        );
    }

    const phoneBookColumn = [
        { id: 1, header: "شماره تماس", accessor: "phoneNumber" },
        { id: 2, header: "نوع شماره تماس", accessor: "phoneNumberType", render: (params: { phoneNumberType: { label: string } }) => <Typography>{params.phoneNumberType.label}</Typography> },
    ]


    return (
        <>
            <ReusableCard>
                <Formik initialValues={{ customerLabelTypeId: "", customerLabelId: "", reportTypeId: 2 }} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <>
                                <div className="flex flex-col lg:flex-row gap-4 w-full mb-4" >
                                    <FormikCustomerLabelType onChange={onChangeCustomerLableType} name="customerLabelTypeId" label="نوع برچسب" />
                                    <FormikCustomerLabel name="customerLabelId" label="نام برچسب" data={customerLabelTools?.data?.data} disabeld={!values.customerLabelTypeId} />
                                </div>
                                <div>
                                    <RadioGroup
                                        key="reportTypeId"
                                        disabled={+values.customerLabelTypeId === 5}
                                        categories={+values.customerLabelTypeId === 5 ?
                                            [
                                                { value: 2, title: "براساس برچسب", defaultChecked: true }
                                            ]
                                            :
                                            [
                                                { value: 2, title: "براساس برچسب", defaultChecked: true },
                                                { value: 1, title: "براساس سوابق خرید", defaultChecked: false },
                                                { value: 3, title: "هردو", defaultChecked: false },
                                            ]
                                        }
                                        name="reportTypeId"
                                        id="reportTypeId"
                                    />
                                    <div className='flex items-end justify-end my-4'>
                                        <ButtonComponent onClick={() => handleFilter(values)} disabled={!values.customerLabelId || !values.customerLabelTypeId}>
                                            <Search className="text-white" />
                                            <Typography className="text-white"> جستجو </Typography>
                                        </ButtonComponent>
                                    </div>

                                </div>
                            </>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={CustomerReportMarketingColumn(renderAction)}
                    rows={customerTools?.data?.data}
                    data={customerTools?.data?.data}
                    isLoading={customerTools.isLoading}
                    onDoubleClick={() => { }}
                />
                {/* <Pagination pageCount={transferList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} /> */}

            </ReusableCard>
            <TransitionsModal
                open={isPhoneBookOpen}
                isClose={() => setIsPhoneBookOpen(false)}
                title={` شماره های تماس ${itemCustomer?.firstName} ${itemCustomer?.lastName}`}
                width="50%"
                description="شماره تماس های مشتری بصورت ذیل ثبت شده است."
            >
                <MuiTable columns={phoneBookColumn} data={itemCustomer?.phonebook?.map((item: any) => (
                    {
                        phoneNumber: item.phoneNumber,
                        phoneNumberType: {
                            value: item.phoneNumberTypeId,
                            label: item.phoneNumberTypeDesc,
                        }
                    }
                )) || []} onDoubleClick={() => { }} />
            </TransitionsModal>

        </>
    )
}

export default CustomerReportMarketing