export interface IExitRemittance {
  ladingPermitId?: number | null | undefined
  bankAccountNo?: string | null | undefined
  bankAccountOwnerName?: string | null | undefined
  creditCardNo?: string | null | undefined
  fareAmount?: number | null | undefined
  otherAmount?: number | null | undefined
  exitPermitDescription?: string | null | undefined
  description?: string | null | undefined
  hasExitPermit?: boolean | null | undefined
  attachments: any
  ladingExitPermitDetails?: {
    ladingLicenseDetailId?: number | null | undefined
    realAmount?: number | null | undefined
    productSubUnitId?: number | null | undefined
    productSubUnitAmount?: number | null | undefined
  }[]

}

export interface IApproveDriveFareAmount {
  ladingExitPermitId: string
  description: string
}

export interface IAddAttachment {
  id: any,
  attachments: [
    {
      fileData: string
    }
  ]
}

export interface IExitRemittanceFilter {
  PageNumber?: number | null | undefined
  PageSize?: number | null | undefined
}
