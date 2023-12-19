export const dropdownPermissions = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, title:string }): any => {
            const { title, id } = obj;
            return { value: id, label: title };
        })
    );
};