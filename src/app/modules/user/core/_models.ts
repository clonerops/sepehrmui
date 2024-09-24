export interface IUser {
    id?: string
    firstName: string
    lastName: string
    email: string
    userName: string
    password: string
    confirmPassword: string
    userRoles?: {
        roleId: string
    }[]
    roleId?: string[]
}


export interface IUserFilter {
    UserRoles?: string[]
}


export interface IForgetPasswordRequest {
    userName: string
}

export interface IChangePassword {
    userName: string,
    newPassword: string,
    verificationCode: string

}