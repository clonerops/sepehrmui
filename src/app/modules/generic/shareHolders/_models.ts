export interface IShareholder {
    id?: string
    firstName: string 
    lastName: string 
    fatherName: string
    mobileNo: string
}

export interface IShareholderFilter {
    shareHolderCode?: number
    pageNumber?: number
    pageSize?: number
}