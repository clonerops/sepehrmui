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
export const dropdownBrandName = (data: any) => {
    return (
        data &&
        data?.map((obj: any): any => {
            return { value: obj.id, label: obj.brand.name };
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
export const dropdownProductName = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; productName: any }): any => {
            const { id, productName } = obj;
            return { value: id, label: productName };
        })
    );
};
export const dropdownProductByBrandName = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; productName: string, productBrandName: string, warehouseName: string, warehouseId: number, productBrandId: number, productMainUnitDesc: string, productSubUnitDesc: string}): any => {
            const { id, productName, productBrandName, warehouseName, warehouseId, productBrandId, productMainUnitDesc, productSubUnitDesc } = obj;
            return { value: id, label: `${productName} (${productBrandName})`, productBrandName: productBrandName, warehouseName: warehouseName, productName: productName, warehouseId: warehouseId, productBrandId: productBrandId, productMainUnitDesc: productMainUnitDesc, productSubUnitDesc: productSubUnitDesc };
        })
    );
};

export const dropdownProductBrandName = (data: any) => {
    return (
        data &&
        data?.map((obj: { productId: any; productName: any }): any => {
            const { productId, productName } = obj;
            return { value: productId, label: productName };
        })
    );
};