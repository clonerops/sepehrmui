import ReusableCard from '../../../../_cloner/components/ReusableCard'
import FileUpload from '../../../../_cloner/components/FileUpload'
import { Button, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { convertFilesToBase64 } from '../../../../_cloner/helpers/convertToBase64'
import { useAddAttachmentsForExit } from '../_hooks'
import Backdrop from '../../../../_cloner/components/Backdrop'

interface IProps {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
    id: any
}

const AttachmentAfterExit: FC<IProps> = ({ files, setFiles, id }) => {
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    const attachmentTools = useAddAttachmentsForExit()

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
        // eslint-disable-next-line
    }, [files]);

    const handleSubmitAttach = () => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        const formData: any = {
            id: id,
            attachments: attachments
        }

        attachmentTools.mutate(formData, {
            onSuccess: () => {

            }
        })
    }

    return (
        <>
            {attachmentTools.isLoading && <Backdrop loading={attachmentTools.isLoading} />}

            <ReusableCard>
                <FileUpload files={files} setFiles={setFiles} />
                <div className="flex justify-end items-end">
                    <Button onClick={handleSubmitAttach} variant="contained" color="secondary">
                        <Typography>ثبت ضمیمه</Typography>
                    </Button>
                </div>
            </ReusableCard>
        </>

    )
}

export default AttachmentAfterExit