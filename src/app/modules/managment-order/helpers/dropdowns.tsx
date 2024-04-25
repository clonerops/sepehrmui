export const dropdownCustomer = (data: any) => {
    return (
        data &&
        data?.map((obj: { firstName: string; customerValidityColorCode: string, lastName: string, mobile: string, id: string }): any => {
            const { firstName, lastName, mobile, id, customerValidityColorCode } = obj;
            return { value: id, label: firstName + " " + lastName + " " + mobile, customerValidityColorCode: customerValidityColorCode };
        })
    );
};
export const dropdownOrderSendType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};
export const dropdownRentPaymentType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, desc:string }): any => {
            const { desc, id } = obj;
            return { value: id, label: desc };
        })
    );
};
export const dropdownPurchaseInvoice = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, desc:string }): any => {
            const { desc, id } = obj;
            return { value: id, label: desc };
        })
    );
};
export const dropdownInvoiceType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, typeDesc:string }): any => {
            const { typeDesc, id } = obj;
            return { value: id, label: typeDesc };
        })
    );
};
export const dropdownWarehouseType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};
export const dropdownWarehouses = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name:string, warehouseTypeId: number }): any => {
            const { name, id, warehouseTypeId } = obj;
            return { value: id, label: name, warehouseTypeId: warehouseTypeId };
        })
    );
};
export const dropdownExitType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, title:string }): any => {
            const { title, id } = obj;
            return { value: id, label: title };
        })
    );
};
export const dropdownOrderExitType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, exitTypeDesc:string }): any => {
            const { exitTypeDesc, id } = obj;
            return { value: id, label: exitTypeDesc };
        })
    );
};
export const dropdownTemporaryType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, title:string }): any => {
            const { title, id } = obj;
            return { value: id, label: title };
        })
    );
};
export const dropdownServices = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};
export const dropdownCustomerCompanies = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, companyName:string }): any => {
            const { companyName, id } = obj;
            return { value: id, label: companyName };
        })
    );
};

export const dropdownRole = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name:string }): any => {
            const { name, id } = obj;
            return { value: id, label: name };
        })
    );
};

export const dropdownShareholders = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, shareHolderCode: number, firstName: string, lastName: string }): any => {
            const { shareHolderCode, id, firstName, lastName } = obj;
            return { value: id, label: `${firstName} ${lastName} - (${shareHolderCode})` };
        })
    );
};


export const dropdownOfficialBank = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, bankName:string }): any => {
            const { bankName, id } = obj;
            return { value: id, label: bankName };
        })
    );
};

