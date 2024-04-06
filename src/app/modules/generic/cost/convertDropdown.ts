
export const dropdownCost = (data: any) => {
    return (
        data &&
        data?.map((obj: { costDescription: string, id: string }): any => {
            const { costDescription,  id } = obj;
            return { value: id, label: costDescription };
        })
    );
};