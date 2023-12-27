export const dropdownPermissions = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};