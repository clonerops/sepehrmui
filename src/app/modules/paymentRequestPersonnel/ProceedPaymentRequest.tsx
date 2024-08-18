import { Button, Typography } from '@mui/material'
import PaymentRequestDetail from './PaymentRequestDetail'
import FileUpload from '../../../_cloner/components/FileUpload'
import { useEffect, useState } from 'react';
import ReusableCard from '../../../_cloner/components/ReusableCard';
import { useProceedPaymentRequest } from './_hooks';
import { useParams } from 'react-router-dom';
import { renderAlert } from '../../../_cloner/helpers/sweetAlert';
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar';
import { convertFilesToBase64 } from '../../../_cloner/helpers/convertToBase64';
import Backdrop from '../../../_cloner/components/Backdrop';
import { Formik } from 'formik';
import FormikCustomer from '../../../_cloner/components/FormikCustomer';
import FormikOrganzationBank from '../../../_cloner/components/FormikOrganzationBank';
import FormikCashDesk from '../../../_cloner/components/FormikCashDesk';
import FormikIncome from '../../../_cloner/components/FormikIncome';
import FormikPettyCash from '../../../_cloner/components/FormikPettyCash';
import FormikCost from '../../../_cloner/components/FormikCost';
import FormikShareholders from '../../../_cloner/components/FormikShareholders';
import FormikInput from '../../../_cloner/components/FormikInput';
import { IProccedRequestPayment } from './_models';
import FormikSelect from '../../../_cloner/components/FormikSelect';
import { dropdownReceivePaymentResource } from '../../../_cloner/helpers/dropdowns';
import { useGetReceivePaymentSources } from '../generic/_hooks';

const initialValues = {
    paymentOriginTypeId: 0,
    paymentOriginId: "",
}


const ProceedPaymentRequestPersonnel = () => {
    const { id }: any = useParams()
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    const proceedPaymentRequest = useProceedPaymentRequest()
    const recievePayTools = useGetReceivePaymentSources()

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }

    }, [files]);

    const renderFields = (customerIdFieldName: string, label: string, receivePaymentSourceId: number) => {
        switch (receivePaymentSourceId) {
            case 1:
                return <FormikCustomer name={customerIdFieldName} label={label} />;
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
                return <FormikShareholders name={customerIdFieldName} label={label} />;
            case 8:
                return <FormikShareholders name={customerIdFieldName} label={label} />;
            default:
                return <FormikInput name={customerIdFieldName} label={label} disabled={true} />;
        }
    };


    const handleProceedPaymentRequest = (values: any) => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        const formData: IProccedRequestPayment = {
            id: id,
            attachments: attachments,
            paymentOriginTypeId: +values.paymentOriginTypeId,
            paymentOriginId: +values.paymentOriginTypeId === 1 ? values.paymentOriginId.value : values.paymentOriginId.toString()
        }

        proceedPaymentRequest.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlert(response.message)
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })
    }

    return (
        <>
            {proceedPaymentRequest.isLoading && <Backdrop loading={proceedPaymentRequest.isLoading} />}
            <PaymentRequestDetail />
            <ReusableCard cardClassName="flex flex-col w-full" >
                <Formik initialValues={initialValues} onSubmit={handleProceedPaymentRequest}>
                    {({ values }) => <div>
                        <div className='flex flex-row gap-4 mb-4'>
                            <FormikSelect name='paymentOriginTypeId' label='نوع پرداخت از' options={dropdownReceivePaymentResource(recievePayTools?.data)} />
                            {renderFields("paymentOriginId", "پرداخت از", values.paymentOriginTypeId)}
                        </div>
                        <FileUpload files={files} setFiles={setFiles} />
                        <div className='flex justify-end items-end my-4'>
                            <Button onClick={() => handleProceedPaymentRequest(values)} className="!bg-green-500 hover:!bg-green-700">
                                <Typography>تایید و پرداخت درخواست</Typography>
                            </Button>
                        </div>
                    </div>}
                </Formik>
            </ReusableCard>

        </>
    )
}

export default ProceedPaymentRequestPersonnel