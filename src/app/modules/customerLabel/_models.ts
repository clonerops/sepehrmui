export interface ICustomerLabel {
    id?: number | undefined | null
    customerLabelTypeId: number | undefined | null,
    productId?: IValueLabel | undefined | null,
    productTypeId?: number | undefined | null,
    brandId?: IValueLabel | undefined | null,
    productBrandId?: IValueLabel | undefined | null,
    labelName: string | undefined | null
}

interface IValueLabel {
    value: any
    label: string
}

export interface IAssignCustomerLabel {
    id?: number | null | undefined
    customerId: string | null | undefined
}