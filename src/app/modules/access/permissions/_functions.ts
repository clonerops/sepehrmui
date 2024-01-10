export const dropdownPermissions = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};


export const dropdownApplicationMenu = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};

export const dropdownPermissionsByMenu = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, permissionName:string }): any => {
            const { permissionName, id } = obj;
            return { value: id, label: permissionName };
        })
    );
};
