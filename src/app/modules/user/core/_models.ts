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
