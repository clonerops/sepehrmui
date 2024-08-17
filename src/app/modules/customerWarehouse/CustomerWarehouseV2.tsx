import { useState, useEffect, useRef } from 'react'
import { Checkbox, Typography } from "@mui/material"
import { Formik, FormikProps } from "formik"

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/fuse"
import ReusableCard from '../../../_cloner/components/ReusableCard'
import Backdrop from '../../../_cloner/components/Backdrop'
import FormikCustomer from '../../../_cloner/components/FormikCustomer'

import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import { useGetCustomer, useGetCustomers } from '../customer/core/_hooks'
import { AssignCustomerLabelsCheckboxColumn, AssignCustomerWarehouseCheckboxColumn } from '../../../_cloner/helpers/columns'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'
import { ICustomerWarehouse } from './_models'
import { usePostCustomerWarehouses } from './_hooks'
import { useGetCustomerLabels } from '../customerLabel/_hooks'
import { useGetWarehouses } from '../generic/_hooks'

const initialValues: any = {
    id: 0,
    customerId: "",
}

const CustomerWarehouseV2 = () => {
    const customers = useGetCustomers()
    const customerDetailTools = useGetCustomer()
    const warehouseTools = useGetWarehouses();


    const { mutate: postCustomerWarehouse, isLoading: postLoading } = usePostCustomerWarehouses();
    const [result, setResult] = useState<ICustomerWarehouse[]>([]);
    const [selectedIds, setSelectedIds] = useState<any>([]);

    let formikRef = useRef<FormikProps<any>>(null);


    useEffect(() => {
        setResult(warehouseTools?.data);
        // eslint-disable-next-line
    }, [warehouseTools?.data]);


    const renderCheckbox = (item: any) => {
        const isChecked = selectedIds.includes(item.row.id);

        return (
            <div className="flex justify-center items-center gap-x-4">
                <Checkbox
                    checked={isChecked}
                    onChange={() => handleCheckboxClick(item.row)}
                />
            </div>
        );
    };

    const handleCheckboxClick = (item: any) => {
        const currentIndex = selectedIds.indexOf(item?.id);
        const newSelectedIds = [...selectedIds];

        if (currentIndex === -1) {
            newSelectedIds.push(item?.id);
        } else {
            newSelectedIds.splice(currentIndex, 1);
        }

        const formData = {
            customerId: formikRef?.current?.values?.customerId?.value,
            warehouses: newSelectedIds
        }
        postCustomerWarehouse(formData, {
            onSuccess: (response: any) => {
                if (response.succeeded) {
                    EnqueueSnackbar(response.message, "success")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })
        setSelectedIds(newSelectedIds);
    };


    const onChangeCustomer = (item: { value: string, label: string }) => {
        if (item?.value) {
            customerDetailTools.mutate(item.value, {
                onSuccess: (response) => {
                    const filtered = response.data.warehouses.map((item: { id: number }) => item.id)
                    setSelectedIds(filtered)
                }
            })
        } else {
            setSelectedIds([])
        }
    }

    if (customers.isLoading) {
        return <Backdrop loading={customers.isLoading} />;
    }
    return (
        <>
            {postLoading && <Backdrop loading={postLoading} />}
            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                <ReusableCard cardClassName='h-[660px]'>
                    <div>
                        <Formik enableReinitialize innerRef={formikRef} initialValues={initialValues} onSubmit={() => { }}>
                            {() => {
                                return <form className="mb-4">
                                    <div className="flex flex-col space-y-4">
                                        <FormikCustomer name="customerId" label="مشتری" divClassName="mt-2 md:mt-0" onChange={onChangeCustomer} />
                                        <div className="mb-4">
                                            <FuzzySearch
                                                keys={[
                                                    "customerLabelTypeDesc",
                                                    "labelName",
                                                ]}
                                                data={warehouseTools?.data}
                                                setResults={setResult}
                                            />
                                        </div>
                                        <MuiDataGrid
                                            columns={AssignCustomerWarehouseCheckboxColumn(renderCheckbox)}
                                            rows={result}
                                            data={warehouseTools?.data}
                                            isLoading={warehouseTools.isLoading || customerDetailTools.isLoading}
                                            height={520}
                                            onDoubleClick={() => { }}
                                        />
                                    </div>
                                </form>
                            }}
                        </Formik>
                    </div>
                </ReusableCard>
                <div className="lg:grid lg:grid-cols-2 lg:gap-4 hidden h-[660px]">
                    <ReusableCard>
                        <div className="flex flex-col flex-wrap gap-4">
                            <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
                            <Typography>از طریق فرم مقابل می توانید انبار هایی را به مشتری های خود اختصاص دهید</Typography>
                            <Typography>جهت اختصاص یک انبار به مشتری بایستی پس از انتخاب مشتری انباری که میخواهید برای آن ثبت شود را انتخاب کنید و اقدام به ثبت کنید</Typography>
                        </div>
                    </ReusableCard>
                    <ReusableCard>
                        <div className="flex flex-col flex-wrap gap-4">
                            <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
                            <Typography>امکان حذف وجود ندارد اما می توانید اقدام به فعالسازی/غیرفعالسازی کنید</Typography>
                            <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
                            <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی با پشتیبانی تماس بگیرید</Typography>
                        </div>
                    </ReusableCard>
                    <ReusableCard cardClassName='col-span-2 flex justify-center items-center'>
                        <img alt="sepehriranian"
                            src={toAbsoulteUrl("/media/images/WarehouseMaintenance.jpg")}
                            className="rounded-md bg-cover"
                        />
                    </ReusableCard>
                </div>
            </div>
        </>
    )
}

export default CustomerWarehouseV2
