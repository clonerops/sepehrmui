
export const dropdownStandard = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc,  id } = obj;
            return { value: id, label: desc };
        })
    );
};