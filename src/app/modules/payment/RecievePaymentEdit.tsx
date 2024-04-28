import { useEffect, useRef, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { Button, Typography } from '@mui/material'
import moment from 'moment-jalaali'

import { useDisApprovePaymentApproved, useGetRecievePaymentById, useUpdatePaymentApproved, useUpdateRecievePaymentById } from './core/_hooks'
import { dropdownReceivePaymentResource } from './helpers/dropdownConvert'
import { useGetReceivePaymentSources } from '../generic/_hooks'
import { convertToPersianWord } from '../../../_cloner/helpers/convertPersian'

import FileUpload from './components/FileUpload'
import FormikSelect from '../../../_cloner/components/FormikSelect'
import FormikInput from '../../../_cloner/components/FormikInput'
import Backdrop from '../../../_cloner/components/Backdrop'
import FormikPrice from '../../../_cloner/components/FormikPrice'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import { EnqueueSnackbar } from '../../../_cloner/helpers/Snackebar'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import { DateRange, Paid } from '@mui/icons-material'
import FormikDescription from '../../../_cloner/components/FormikDescription'
import FormikCustomer from '../../../_cloner/components/FormikCustomer'
import { useParams } from 'react-router-dom'
import { separateAmountWithCommas } from '../../../_cloner/helpers/SeprateAmount'
import useBase64toFile from '../../../_cloner/helpers/convertBaseToFile'
import ConfirmDialog from '../../../_cloner/components/ConfirmDialog'
import TransitionsModal from '../../../_cloner/components/ReusableModal'
import FormikOrganzationBank from '../../../_cloner/components/FormikOrganzationBank'
import FormikCashDesk from '../../../_cloner/components/FormikCashDesk'
import FormikIncome from '../../../_cloner/components/FormikIncome'
import FormikPettyCash from '../../../_cloner/components/FormikPettyCash'
import FormikCost from '../../../_cloner/components/FormikCost'
import FormikShareholders from '../../../_cloner/components/FormikShareholders'
import FormikCompany from '../../../_cloner/components/FormikCompany'


const RecievePaymentEdit = () => {
    const { id }: any = useParams()
    const formikRef = useRef<FormikProps<any>>(null)

    const [approve, setApprove] = useState<boolean>(false);
    const [disApprove, setDisApprove] = useState<boolean>(false);

    const convertBase64ToFile = useBase64toFile()

    const { mutate, isLoading } = useUpdateRecievePaymentById()
    const updateApprove = useUpdatePaymentApproved()

    const { data: paymentResource } = useGetReceivePaymentSources()
    const { mutate: reject, isLoading: rejectLoading } = useDisApprovePaymentApproved()

    const detailTools = useGetRecievePaymentById(id)
    const initialValues = {
        receivedFrom: "",
        payTo: "",
        accountOwner: "",
        amount: "",
        trachingCode: "",
        companyName: "",
        contractCode: "",
        description: "",
        receivePaymentSourceFromId: "",
        receiveFromCustomerId: "",
        receiveFromCustomerIdForm: "",
        receivePaymentSourceToId: "",
        payToCustomerIdForm: "",
        payToCustomerId: "",
        accountingDocNo: "",
        receiveFromId: "",
        payToId: "",
        accountingDescription: "",

    }
    const [files, setFiles] = useState<File[]>([]);

    const formData = new FormData()
    
    const onSubmit = async (values: any) => {
        formData.append("Id", id)
        formData.append("ReceivePaymentTypeFromId", values.receivePaymentTypeFromId ? values.receivePaymentTypeFromId : detailTools?.data?.data?.receivePaymentTypeFromId)
        formData.append("ReceivePaymentTypeToId", values.receivePaymentTypeToId ? values.receivePaymentTypeToId : detailTools?.data?.data?.receivePaymentTypeToId)
        formData.append("ReceiveFromId", values?.receiveFromDesc?.value ? values?.receiveFromDesc?.value : values.receiveFromId ? values.receiveFromId : detailTools?.data?.data?.receiveFromId)
        formData.append("PayToId", values?.payToDesc?.value ? values?.payToDesc?.value : values.payToId ? values.payToId : detailTools?.data?.data?.payToId)
        formData.append("Amount", values?.amount ? +values?.amount?.replace(/,/g, "") : detailTools?.data?.data?.amount)
        formData.append("AccountOwner", values?.accountOwner ? values?.accountOwner : detailTools?.data?.data?.accountOwner)
        formData.append("TrachingCode", values?.trachingCode ? values?.trachingCode : detailTools?.data?.data?.trachingCode)
        formData.append("CompanyName", values?.companyName ? values?.companyName : detailTools?.data?.data?.companyName)
        formData.append("ContractCode", values?.contractCode ? values?.contractCode : detailTools?.data?.data?.contractCode)
        formData.append("AccountingDocNo", values?.accountingDocNo ? +values?.accountingDocNo : detailTools?.data?.data?.accountingDocNo)
        formData.append("AccountingDescription",  values?.accountingDescription ? values?.accountingDescription : (detailTools?.data?.data?.accountingDescription === "" || detailTools?.data?.data?.accountingDescription === null) ? "ندارد" : detailTools?.data?.data?.accountingDescription)
        formData.append("Description", values?.description ? values?.description : detailTools?.data?.data?.description)
        formData.append("ReceivedFrom", "")
        formData.append("ReceiveFromCompanyId", values?.receiveFromCompanyId ? values?.receiveFromCompanyId : detailTools?.data?.data?.receiveFromCompanyId === null ? "" : detailTools?.data?.data?.receiveFromCompanyId)
        formData.append("PayToCompanyId", values?.payToCompanyId ? values?.payToCompanyId : detailTools?.data?.data?.payToCompanyId === null ? "" : detailTools?.data?.data?.payToCompanyId)
        formData.append("PayTo", "")
            files.forEach((file) => {
                formData.append('Attachments', file);
        });
        mutate(formData, {
            onSuccess: (response) => {
                if (response?.succeeded) {
                    EnqueueSnackbar("ویرایش با موفقیت انجام پذیرفت", "success")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })

    }


    const handleConfirm = () => {
        if (id)
        mutate(formData, {
            onSuccess: (response) => {
                if (response?.succeeded) {
                    EnqueueSnackbar("ویرایش با موفقیت انجام پذیرفت", "success")
                    if(approve) {
                        setApprove(false)
                        updateApprove.mutate(id, {
                            onSuccess: (response) => {
                                if (response?.succeeded) {
                                    EnqueueSnackbar(response.message, "success")
                                } else {
                                    EnqueueSnackbar(response.data.Message, "warning")
                                }
                            }
                        })            
                    }
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })



    }

    const renderFields = (customerIdFieldName: string, label: string, receivePaymentSourceId: number) => {
        let fieldNameFrom = "receiveFromId";
        
        if (receivePaymentSourceId === 1 && detailTools?.data?.data?.receivePaymentTypeFromId === 1) {
            fieldNameFrom = "receiveFromDesc"; 
        }

        let fieldNameTo = "payToId";
        if (receivePaymentSourceId === 1 && detailTools?.data?.data?.receivePaymentTypeToId === 1) {
            fieldNameTo = "payToDesc"; 
        }
    
        // Check if customerIdFieldName matches "receiveFromId" or "payToId"
        const isReceiveFrom = customerIdFieldName === "receiveFromId";
        const isPayTo = customerIdFieldName === "payToId";
    
        switch (receivePaymentSourceId) {
            case 1:
                if (isReceiveFrom) {
                    return <FormikCustomer name={fieldNameFrom} label={label} />;
                }
                if (isPayTo) {
                    return <FormikCustomer name={fieldNameTo} label={label} />;
                }
                break;
            case 2:
                return <FormikOrganzationBank name={customerIdFieldName} label={label} />;
            case 3:
                return <FormikCashDesk name={customerIdFieldName} label={label} />;
            case 4:
                return <FormikIncome name={customerIdFieldName} label={label} />;
            case 5:
                return <FormikPettyCash name={customerIdFieldName} label={label} />;
            case 6:
                return <FormikCost name={customerIdFieldName} label={label} />;
            case 7:
            case 8:
                return <FormikShareholders name={customerIdFieldName} label={label} />;
            default:
                return <FormikInput name={customerIdFieldName} label={label} disabled={true} />;
        }
    };
    

    const handleDisApproveConfirm = (values: any) => {
        const formData = {
            id: id,
            accountingDescription: values.accountingDescription
        }
        if (id)
            reject(formData, {
                onSuccess: (response) => {
                    if (response?.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        setApprove(false)

                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                }
            })

    }

    useEffect(() => {
        if (detailTools.isLoading) {
            setFiles([])
        } else {
            setFiles(detailTools?.data?.data?.attachments?.map((item: { fileData: string }) => convertBase64ToFile(item.fileData, "example.jpg")))
        }
        // eslint-disable-next-line
    }, [detailTools?.isLoading])


    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                <CardWithIcons
                    title='شماره'
                    icon={<Paid className="text-white" />}
                    value={detailTools?.data?.data?.receivePayCode}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='تاریخ ثبت'
                    icon={<DateRange className="text-white" />}
                    value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                    iconClassName='bg-[#EB5553]' />
            </div>

            <ReusableCard>
                <div className='mt-2'>
                    <Formik enableReinitialize initialValues={{
                        ...initialValues,
                        ...detailTools?.data?.data,
                        amount: detailTools?.data?.data?.amount ? separateAmountWithCommas(detailTools?.data?.data?.amount) : "",

                    }} onSubmit={onSubmit}>
                        {({ handleSubmit, values }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-0'>
                                    <FormikSelect disabeld  name='receivePaymentTypeFromId' label='نوع دریافت از' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {renderFields("receiveFromId", "دریافت از", values.receivePaymentTypeFromId)}
                                    <FormikSelect disabled name='receivePaymentTypeToId' label='نوع پرداخت به' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {renderFields("payToId", "پرداخت به", values.receivePaymentTypeToId)}

                                    <FormikInput name='accountOwner' label='صاحب حساب' type='text' />
                                    <div className='flex flex-col'>
                                        <FormikPrice name='amount' label='مبلغ' type='text' />
                                        <Typography variant='subtitle1' color="primary">{convertToPersianWord(Number(values.Amount?.replace(/,/g, "")))} تومان</Typography>
                                    </div>

                                    <FormikInput name='trachingCode' label='کد پیگیری' type='text' />
                                    {detailTools?.data?.data?.receivePaymentTypeFromId === 1 &&
                                        <FormikCompany customerid={values?.receiveFromDesc ? values?.receiveFromDesc?.value : detailTools?.data?.data?.receiveFromId} name="receiveFromCompanyId" label="نام شرکت دریافت از" />
                                    }
                                    {detailTools?.data?.data?.receivePaymentTypeToId  === 1 && 
                                        <FormikCompany customerid={values?.payToDesc ? values?.payToDesc?.value : detailTools?.data?.data?.payToId} name="payToCompanyId" label="نام شرکت پرداخت به" />
                                    }

                                    <FormikInput name='contractCode' label='کد قرارداد' type='text' />
                                </div>
                                <div className='grid grid-cols-1 my-8'>
                                    <FormikDescription name='accountingDescription' label='توضیحات حسابداری' type='text' />
                                </div>
                                <div className='grid grid-cols-1 my-8'>
                                    <FormikDescription name='description' label='توضیحات' type='text' />
                                </div>
                                <div className='grid grid-cols-1'>
                                    <FileUpload files={files} setFiles={setFiles} />
                                </div>
                                <div className='flex gap-x-4'>
                                    <Button disabled={detailTools?.data?.data?.receivePayStatusId >= 3} onClick={() => handleSubmit()} variant="contained" color="secondary">
                                        <Typography variant="h3" className="px-8 py-2">ویرایش دریافت و پرداخت</Typography>
                                    </Button>
                                    <Button disabled={detailTools?.data?.data?.receivePayStatusId >= 2} variant="contained" onClick={() => setApprove(true)} className='mb-2' color="primary">
                                        <Typography variant="h3">{isLoading ? "در حال پردازش..." : "ثبت تایید"}</Typography>
                                    </Button>
                                    <Button variant="contained" onClick={() => setDisApprove(true)} className='mb-2 !bg-red-500 hover:!bg-red-700' >
                                        <Typography>{rejectLoading ? "در حال پردازش..." : "عدم تایید حسابداری"}</Typography>
                                    </Button>
                                </div>

                            </form>
                        }}
                    </Formik>
                </div>
            </ReusableCard>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از تایید سند دریافت و پرداخت مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={updateApprove?.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleConfirm()}
            />
            <TransitionsModal
                open={disApprove}
                isClose={() => setDisApprove(false)}
                title="عدم تایید دریافت و پرداخت"
                width="60%"
                description=" درصورتی که دریافت و پرداخت مورد تایید نمی باشد می توانید از طریق فرم زیر اقدام به عدم تایید آن نمایید"
            >
                <div className="flex flex-col space-y-4 mt-4">
                    <Typography variant="h3"> شماره دریافت پرداخت: {detailTools?.data?.data?.receivePayCode}</Typography>
                    <Formik initialValues={{accountingDescription: ""}} onSubmit={handleDisApproveConfirm}>
                        {({handleSubmit}) => (
                            <form>
                                <FormikDescription name="accountingDescription" label="توضیحات حسابداری" />
                                <div className="flex gap-x-4 justify-end items-end mt-2">
                                    <Button onClick={() => handleSubmit()} className='!bg-red-500 hover:!bg-red-700'>
                                        <Typography variant="h3" className="text-white">عدم تایید حسابداری</Typography>
                                    </Button>
                                    <Button onClick={() => setDisApprove(false)} variant="outlined" color="secondary">
                                        <Typography variant="h4">لغو</Typography>
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </TransitionsModal>

        </>
    )
}

export default RecievePaymentEdit