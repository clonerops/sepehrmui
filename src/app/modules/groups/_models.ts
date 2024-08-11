interface IRoleGroup {
    id?: string
    name: string
    description: string
    rolePermissions: {permissionId: string, roleId?: string}[]
}