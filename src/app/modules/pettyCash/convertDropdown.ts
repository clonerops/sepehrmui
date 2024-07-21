
export const dropdownPettyCash = (data: any) => {
    return (
        data &&
        data?.map((obj: { pettyCashDescription: string, mobileNo: string, id: string }): any => {
            const { pettyCashDescription, mobileNo,  id } = obj;
            return { value: id, label: `${pettyCashDescription} - (${mobileNo})` };
        })
    );
};