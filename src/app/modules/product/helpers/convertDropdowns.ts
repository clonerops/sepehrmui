export const dropdownTypes = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc,  id } = obj;
            return { value: id, label: desc };
        })
    );
};
export const dropdownStandard = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc,  id } = obj;
            return { value: id, label: desc };
        })
    );
};
export const dropdownState = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc,  id } = obj;
            return { value: id, label: desc };
        })
    );
};
export const dropdownUnit = (data: any) => {
    return (
        data &&
        data?.map((obj: { unitName: string, id: string }): any => {
            const { unitName,  id } = obj;
            return { value: id, label: unitName };
        })
    );
};