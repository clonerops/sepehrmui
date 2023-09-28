import { Form, Formik } from "formik";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { ICustomer } from "../core/_models";
import { useUpdateCustomer } from "../core/_hooks";
import { convertValueLabelCustomerValidaty } from "../helpers/convertValueLabel";
import { customerType } from "../helpers/customerType";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { useGetCustomerValidities } from "../../generic/_hooks";

const EditCustomer = (props: {
    item: ICustomer | undefined,
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>

}) => {
    const { mutate, data, isLoading } = useUpdateCustomer();
    const { data: customerValidityData } = useGetCustomerValidities()

    const initialValues = {
        id: props.item?.id,
        firstName: props.item?.firstName,
        lastName: props.item?.lastName,
        fatherName: props.item?.fatherName,
        officialName: props.item?.officialName,
        nationalId: props.item?.nationalId,
        nationalId2: props.item?.nationalId2,
        mobile: props.item?.mobile,
        isSupplier: props.item?.isSupplier,
        tel1: props.item?.tel1,
        tel2: props.item?.tel2,
        customerType: props.item?.customerType,
        customerValidityId: props.item?.customerValidityId,
        representative: props.item?.representative,
        address1: props.item?.address1,
        address2: props.item?.address2,
    };
    return (
        <>
            {/* {data?.data?.status === 400 && (
                <ErrorText text={data?.data?.title} />
            )} */}

            <Formik initialValues={initialValues} onSubmit={
                async (values, { setStatus, setSubmitting }) => {
                    try {
                        mutate(values, {
                            onSuccess: () => {
                                // ToastComponent("ویرایش با موفقیت انجام شد")
                                props.refetch()
                            }
                        });
                    } catch (error) {
                        setStatus("اطلاعات ثبت مشتری نادرست می باشد");
                        setSubmitting(false);
                    }
                }
            }>
                {({ handleSubmit }) => {
                    return <Form onSubmit={handleSubmit} className="container">
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-x-4">
                            <FormikInput title="نام"  name="firstName" label="نام" type="text" />
                            <FormikInput title="نام خانوادگی"  name="lastName" label="نام خانوادگی" type="text" />
                            <FormikInput title="نام پدر"  name="fatherName" label="نام پدر" type="text" />
                            <FormikInput title="اسم رسمی مشتری"  name="officialName" label="اسم رسمی مشتری" type="text" />
                            <FormikInput title="شناسه ملی"  name="nationalId2" label="شناسه ملی" type="text" />
                            <FormikInput title="کدملی"  name="nationalId" label="کدملی" type="text" />
                        </div>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-4">
                            <FormikInput title="معرف"  name="representative" label="معرف" type="text" />
                            <FormikInput title="موبایل"  name="mobile" label="موبایل" type="text" />
                            <FormikInput title="تلفن 1"  name="tel1" label="تلفن 1" type="text" />
                            <FormikInput title="تلفن 2"  name="tel2" label="تلفن 2" type="text" />
                        </div>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-x-4">
                            <div className="tw-w-full tw-my-2 tw-text-right">
                                <label className="tw-flex">
                                    <FormikInput defaultChecked={props.item?.isSupplier}  name="isSupplier" label="" type="checkbox" />
                                    <span className="tw-px-4 tw-font-bold tw-text-lg">آیا تامین کننده می باشد؟</span>
                                </label>
                            </div>
                            <FormikSelect defaultValue={{ value: props.item?.customerType, label: props.item?.customerType === 0 ? "حقیقی" : "حقوقی" }} options={customerType} name="customerType" label="نوع مشتری" />
                            <FormikSelect defaultValue={{ value: props.item?.customerValidityId, label: props.item?.customerValidityId === 1 ? "عادی" : props.item?.customerValidityId === 2 ? "VIP" : "سیاه" }} options={convertValueLabelCustomerValidaty(customerValidityData)} name="customerValidityId" label="نوع اعتبار" />
                        </div>
                        <div className="tw-w-full tw-my-2 md:tw-col-span-3">
                            <FormikInput title="آدرس 1"  name="address1" label="آدرس 1" type="text" />
                            <FormikInput title="آدرس 2"  name="address2" label="آدرس 2" type="text" />
                        </div>
                        {/* <SubmitButton isLoading={isLoading} title="ویرایش مشتری" isUpdate /> */}
                    </Form>
                }}
            </Formik>
        </>
    );
};

export default EditCustomer;