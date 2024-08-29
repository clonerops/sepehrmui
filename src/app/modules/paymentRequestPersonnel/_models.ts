export interface IRequestPayment {
    id?: string | null | undefined
    personnelId: {
        value: string, label: string
    },
    amount: string | null | undefined,
    paymentRequestReasonDesc: string | null | undefined,
    bankAccountOrShabaNo: string | null | undefined,
    accountOwnerName: string | null | undefined,
    paymentRequestDescription: string | null | undefined
    paymentRequestTypeId: string | null | undefined
}

export interface IArrpoveRequestPayment {
    id: string
    amount: number
}

export interface IProccedRequestPayment {
    id: string,
    paymentOriginTypeId: number,
    paymentOriginId: any,
    attachments: any
  
}

export interface IRequestPaymentFilter {
    FromDate?: string | null | undefined
    ToDate?: string | null | undefined
    PageNumber?: number | null | undefined
    PageSize?: number | null | undefined
}