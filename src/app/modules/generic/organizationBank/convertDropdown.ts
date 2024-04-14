
export const dropdownOrganzationBank = (data: any) => {
    return (
        data &&
        data?.map((obj: { accountOwner: string, accountNo: string, id: string, bank: {bankName: string} }): any => {
            const { accountOwner, accountNo,  id, bank } = obj;
            // return { value: id, label: `${accountOwner} - (${accountNo})` };
            return { value: id, label: `${bank.bankName}- (ص.ح: ${accountOwner})-(ش.ح:${accountNo})` };
        })
    );
};