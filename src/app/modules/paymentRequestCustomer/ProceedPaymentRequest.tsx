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

const ProceedPaymentRequest = () => {
    const { id }: any = useParams()
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    const proceedPaymentRequest = useProceedPaymentRequest()

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }

    }, [files]);


    const handleProceedPaymentRequest = () => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        const formData = {
            id: id,
            attachments: attachments
        }
        proceedPaymentRequest.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlert("تایید درخواست پرداخت با موفقیت انجام شد")
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
                <Typography variant="h2" color="primary" className="pb-4">
                    افزودن پیوست
                </Typography>
                <FileUpload files={files} setFiles={setFiles} />
                <div className='flex justify-end items-end my-4'>
                    <Button onClick={() => handleProceedPaymentRequest()} className="!bg-green-500 hover:!bg-green-700">
                        <Typography>تایید و پرداخت درخواست</Typography>
                    </Button>
                </div>
            </ReusableCard>

        </>
    )
}

export default ProceedPaymentRequest