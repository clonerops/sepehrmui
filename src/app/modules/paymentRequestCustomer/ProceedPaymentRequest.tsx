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
import { IProccedRequestPayment } from './_models';
import PaymentOriginType from '../../../_cloner/components/PaymentOriginType';
import { useAuth } from '../../../_cloner/helpers/checkUserPermissions';
import AccessDenied from '../../routing/AccessDenied';

const initialValues = {
    paymentOriginTypeId: 0,
    paymentOriginId: "",
}

const ProceedPaymentRequest = () => {
    const { hasPermission } = useAuth()

    const { id }: any = useParams()
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    const proceedPaymentRequest = useProceedPaymentRequest()

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }

    }, [files]);


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

    if (!hasPermission("ProceedToPaymentRequest"))
        return <AccessDenied />

    return (
        <>
            {proceedPaymentRequest.isLoading && <Backdrop loading={proceedPaymentRequest.isLoading} />}
            <PaymentRequestDetail />
            <ReusableCard cardClassName="flex flex-col w-full" >
                <Formik initialValues={initialValues} onSubmit={handleProceedPaymentRequest}>
                    {({ values }) => <div>
                        <div className='flex flex-row gap-4 mb-4'>
                            <PaymentOriginType className='flex flex-row gap-x-4' label="نوع پرداخت به" officialLabel="پرداخت به" typeName="paymentOriginTypeId" officialName="paymentOriginId" typeId={values.paymentOriginTypeId} />
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

export default ProceedPaymentRequest