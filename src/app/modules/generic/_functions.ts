export const dropdownCustomer = (data: any) => {
    return (
        data &&
        data?.map((obj: { firstName: string; lastName: string, id: string }): any => {
            const { firstName, lastName, id } = obj;
            return { value: id, label: firstName + " " + lastName };
        })
    );
};

export const dropdownBrand = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; name: any }): any => {
            const { id, name } = obj;
            return { value: id, label: name };
        })
    );
};
export const dropdownProduct = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; productName: any }): any => {
            const { id, productName } = obj;
            return { value: id, label: productName };
        })
    );
};
export const dropdownProductIntegrated = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; productIntegratedName: any }): any => {
            const { id, productIntegratedName } = obj;
            return { value: id, label: productIntegratedName };
        })
    );
};