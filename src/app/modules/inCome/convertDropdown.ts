
export const dropdownIncome = (data: any) => {
    return (
        data &&
        data?.map((obj: { incomeDescription: string, id: string }): any => {
            const { incomeDescription,  id } = obj;
            return { value: id, label: incomeDescription };
        })
    );
};