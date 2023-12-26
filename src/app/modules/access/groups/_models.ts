interface IRoleGroup {
    name: string
    description: string
    rolePermissions: {permissionId: string, roleId?: string}[]
}