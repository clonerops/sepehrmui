export interface IPersonnel {
    id?: string | undefined
    personnelCode?: number | undefined
    firstName?: string | undefined
    lastName?: string | undefined
    fatherName?: string | undefined
    officialName?: string | undefined
    nationalId?: string | undefined
    address1?: string | undefined
    address2: string | undefined
    nationalCode?: string | undefined
    nickName?: string | undefined
    email?: string | undefined
    phonebook?: {
        phoneNumber: string
        phoneNumberTypeId: number
    }[] | undefined | null

}

export interface IPhoneBook {
    phoneNumber: string
    phoneNumberType: {
        label: string,
        value: number
    }
}

export interface IPersonnelFilter {
    
}