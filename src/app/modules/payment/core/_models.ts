export interface IPayment {
    id?: string | null | undefined
    receivedFrom: string | null | undefined,
    payTo: string | null | undefined,
    accountOwner: string | null | undefined,
    trachingCode: number | null | undefined,
    companyName: string | null | undefined,
    contractCode: number | null | undefined,
    isAccountingApproval: boolean | null | undefined,
    accountingApprovalDate: string | null | undefined,
    accountingApproverId: string | null | undefined,
    description: string | null | undefined,
    attachments: IAttachment[] | null | undefined
}

export interface IAttachment {
    id: string | null | undefined
    fileData: string 
}

export interface IPaymentFilter {
    IsApproved?: number | null | undefined
    StatusId?: number | null | undefined
    FromDate?:  string | null | undefined
    ToDate?:  string | null | undefined
    PageNumber?:  number | null | undefined
    PageSize?:  number | null | undefined
}