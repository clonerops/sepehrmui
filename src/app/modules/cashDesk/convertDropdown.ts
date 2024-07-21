
export const dropdownCashDesk = (data: any) => {
    return (
        data &&
        data?.map((obj: { cashDeskDescription: string, id: string }): any => {
            const { cashDeskDescription,  id } = obj;
            return { value: id, label: cashDeskDescription };
        })
    );
};