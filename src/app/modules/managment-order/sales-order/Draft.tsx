import { AddTask, AdsClick, DesignServices } from "@mui/icons-material"
import CardWithIcons from "../../../../_cloner/components/CardWithIcons"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import moment from "moment-jalaali"
import { useState } from "react"
import { Button, Typography } from "@mui/material"
import FileUpload from "../../../../_cloner/components/FileUpload"
import { Formik } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"

const Draft = () => {
    const [files, setFiles] = useState<File[]>([]);

    const onSubmit = (values: any) => { }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 ">
                <CardWithIcons
                    title='شماره سریال'
                    icon={<DesignServices className="text-white" />}
                    value={0}
                    iconClassName='bg-[#3322D8]' />
                <CardWithIcons
                    title='تاریخ'
                    icon={<AddTask className="text-white" />}
                    value={moment(new Date()).format('jYYYY/jMM/jDD')}
                    iconClassName='bg-[#369BFD]' />
            </div>

            <ReusableCard cardClassName="my-4">
                <Formik initialValues={{ description: "" }} onSubmit={onSubmit}>
                    {({ handleSubmit, values }) => <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full">
                            <Typography variant="h2" color="primary" className="pb-4">
                                افزودن پیوست
                            </Typography>
                            <FileUpload files={files} setFiles={setFiles} />
                        </div>

                        <FormikInput minRows={3} multiline name="description" label="توضیحات" />
                        <div className="flex justify-end">
                            <Button onClick={() => onSubmit(values)} className="!bg-green-500 !text-white hover:!bg-green-800">
                                <Typography className='px-32 py-2 text-black flex flex-row gap-x-4' variant='h2'>
                                    <AdsClick className="text-black" />
                                    ثبت پیش نویس سفارش
                                </Typography>
                            </Button>
                        </div>
                    </form>}
                </Formik>
            </ReusableCard>
        </>
    )
}

export default Draft