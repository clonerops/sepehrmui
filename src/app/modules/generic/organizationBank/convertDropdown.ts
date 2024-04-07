
export const dropdownOrganzationBank = (data: any) => {
    return (
        data &&
        data?.map((obj: { accountOwner: string, accountNo: string, id: string }): any => {
            const { accountOwner, accountNo,  id } = obj;
            return { value: id, label: `${accountOwner} - (${accountNo})` };
        })
    );
};