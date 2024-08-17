export interface IRequestPayment {
    id?: string | null | undefined
    personnelId: {
        value: string, label: string
    },
    amount: string | null | undefined,
    paymentRequestReasonId: number | null | undefined,
    bankAccountOrShabaNo: string | null | undefined,
    accountOwnerName: string | null | undefined,
    bankId: number | null | undefined,
    paymentRequestTypeId: number | null | undefined,
    applicatorName: string | null | undefined,
    paymentRequestDescription: string | null | undefined
}


export interface IRequestPaymentFilter {
    FromDate?: string | null | undefined
    ToDate?: string | null | undefined
    PageNumber?: number | null | undefined
    PageSize?: number | null | undefined
}