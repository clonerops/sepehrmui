export interface IRequestPayment {
    id?: string | null | undefined
    customerId: {
        value: string, label: string
    },
    amount: string | null | undefined,
    paymentReason: string | null | undefined,
    bankAccountOrShabaNo: string | null | undefined,
    accountOwnerName: string | null | undefined,
    bankId: number | null | undefined,
    applicatorName: string | null | undefined,
    paymentRequestStatusId: number | null | undefined,
    paymentRequestDescription: string | null | undefined
}


export interface IRequestPaymentFilter {
    FromDate?: string | null | undefined
    ToDate?: string | null | undefined
    PageNumber?: number | null | undefined
    PageSize?: number | null | undefined
}