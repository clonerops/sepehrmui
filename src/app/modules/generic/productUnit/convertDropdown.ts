
export const dropdownUnit = (data: any) => {
    return (
        data &&
        data?.map((obj: { unitName: string, id: string }): any => {
            const { unitName,  id } = obj;
            return { value: id, label: unitName };
        })
    );
};