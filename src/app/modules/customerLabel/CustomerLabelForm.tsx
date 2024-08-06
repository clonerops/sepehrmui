import { Formik } from "formik"
import { ICustomerLabel } from "./_models"
import { useGetCustomerLabel, useGetCustomerLabelByMutation, usePostCustomerLabels, useUpdateCustomerLabels } from "./_hooks"
import FormikType from "../../../_cloner/components/FormikType"
import FormikProduct from "../../../_cloner/components/FormikProductComboSelect"
import FormikBrand from "../../../_cloner/components/FormikBrand"
import FormikProductBrand from "../../../_cloner/components/FormikProductBrandComboSelect"
import FormikInput from "../../../_cloner/components/FormikInput"
import Backdrop from "../../../_cloner/components/Backdrop"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"
import FormikCustomerLabelType from "../../../_cloner/components/FormikCustomerLableType"
import ButtonComponent from "../../../_cloner/components/ButtonComponent"
import { AddCircleOutline } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { FC, useEffect } from "react"

const initialValues: ICustomerLabel = {
    id: 0,
    customerLabelTypeId: 0,
    productId: {
        value: "",
        label: ""
    },
    productTypeId: 0,
    brandId: {
        value: "",
        label: ""
    },
    productBrandId: {
        value: "",
        label: ""
    },
    labelName: ""
}

interface IProps {
    id?: number
    refetch: any
    onClose?: any
}

const CustomerLabelForm:FC<IProps> = ({id, refetch, onClose}) => {

    const { mutate: postCustomerLabel, isLoading: postLoading } = usePostCustomerLabels()
    const { mutate: updateCustomerLabel, isLoading: updateLoading } = useUpdateCustomerLabels()
    const detailTools = useGetCustomerLabelByMutation()

    useEffect(() => {
        if(id) detailTools.mutate(id || 0)
    }, [id])

    const renderFields = (customerLabelType: number | undefined | null) => {
        console.log(customerLabelType)
        switch (customerLabelType) {
            case 1:
                return <FormikType name="productTypeId" label="برچسب" boxClassName=" mt-2 md:mt-0" />
                break;
            case 2:
                return <FormikProduct name="productId" label="برچسب" boxClassName=" mt-2 md:mt-0" />
                break;
            case 3:
                return <FormikBrand name="brandId" label="برچسب" boxClassName=" mt-2 md:mt-0" />
                break;
            case 4:
                return <FormikProductBrand name="productBrandId" label="برچسب" boxClassName=" mt-2 md:mt-0" />
                break;
            default:
                return <FormikInput name="labelName" label="برچسب" boxClassName=" mt-2 md:mt-0" />
                break;
        }
    }

    const onAdd = (values: ICustomerLabel) => {
        const formData: ICustomerLabel = {
            customerLabelTypeId: values.customerLabelTypeId,
            productId: values.productId?.value ? values.productId.value : null,
            productTypeId: values.productTypeId ? values.productTypeId : null,
            brandId: values.brandId?.value ? values.brandId.value : null,
            productBrandId: values.productBrandId?.value ? values.productBrandId?.value : null,
            labelName: values.labelName
        }
        postCustomerLabel(formData, {
            onSuccess: (response: any) => {
                if (response.succeeded) {
                    EnqueueSnackbar(response.message, "success")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
                refetch()
                onClose()
            }
        })
    }

    const onUpdate = (values: ICustomerLabel) => {
        const formData: ICustomerLabel = {
            id: id,
            customerLabelTypeId: values.customerLabelTypeId,
            productId: values.productId?.value ? values.productId.value : null,
            productTypeId: values.productTypeId ? values.productTypeId : null,
            brandId: values.brandId?.value ? values.brandId.value : null,
            productBrandId: values.productBrandId?.value ? values.productBrandId?.value : null,
            labelName: values.labelName
        }
        updateCustomerLabel(formData, {
            onSuccess: (response: any) => {
                if (response.succeeded) {
                    EnqueueSnackbar(response.message, "success")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
                refetch()
                onClose()
            }
        })
    }

    const handleSubmit = (values: ICustomerLabel) => {
        if (id) onUpdate(values);
        else onAdd(values);
        refetch();
    };


    if(detailTools.isLoading) {
        return <Backdrop loading={detailTools.isLoading} />
    }

    return (
        <>
            {updateLoading && <Backdrop loading={updateLoading} />}
            {postLoading && <Backdrop loading={postLoading} />}
            <Formik initialValues={id ? {
                ...initialValues,
                ...detailTools?.data?.data,
                productId: {value: detailTools?.data?.data?.productId, label: detailTools?.data?.data?.productName},
                brandId: {value: detailTools?.data?.data?.brandId, label: detailTools?.data?.data?.brandName},
                productBrandId: {value: detailTools?.data?.data?.productBrandId, label: detailTools?.data?.data?.productBrandName},

            } : initialValues} onSubmit={handleSubmit}>
                {({ handleSubmit, values }) => {
                    return <form onSubmit={handleSubmit} className="my-4">
                        <div className="flex flex-col justify-start items-start gap-4 ">
                            <FormikCustomerLabelType name="customerLabelTypeId" label="نوع برچسب" boxClassName=" mt-2 md:mt-0" />
                            {renderFields(values.customerLabelTypeId)}
                            <ButtonComponent>
                                <Typography className="px-2 flex flex-row gap-x-4 text-white">
                                    <AddCircleOutline className='!text-white' />
                                    ایجاد برچسب جدید
                                </Typography>
                            </ButtonComponent>
                        </div>
                    </form>
                }}
            </Formik>
        </>
    )
}

export default CustomerLabelForm