import { separateAmountWithCommas } from "./SeprateAmount";

const dropdownBrand = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; name: any }): any => {
            const { id, name } = obj;
            return { value: id, label: name };
        })
    );
};

const dropdownCustomer = (data: any) => {
    return (
        data &&
        data?.map((obj: { firstName: string; lastName: string, id: string }): any => {
            const { firstName, lastName, id } = obj;
            return { value: id, label: firstName + " " + lastName };
        })
    );
};

const dropdownBrandName = (data: any) => {
    return (
        data &&
        data?.map((obj: any): any => {
            return { value: obj.id, label: obj.brand.name };
        })
    );
};


const dropdownProduct = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; productName: any }): any => {
            const { id, productName } = obj;
            return { value: id, label: productName };
        })
    );
};

const dropdownProductByBrandName = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; productName: string, productBrandName: string, warehouseName: string, warehouseId: number, productBrandId: number, productMainUnitDesc: string, productSubUnitDesc: string, productSubUnitId: number, exchangeRate: string }): any => {
            const { id, productName, productBrandName, warehouseName, warehouseId, productBrandId, productMainUnitDesc, productSubUnitDesc, productSubUnitId, exchangeRate } = obj;
            return { value: id, label: `${productName} (${productBrandName})`, productBrandName: productBrandName, warehouseName: warehouseName, productName: productName, warehouseId: warehouseId, productBrandId: productBrandId, productMainUnitDesc: productMainUnitDesc, productSubUnitDesc: productSubUnitDesc, productSubUnitId: productSubUnitId, exchangeRate: exchangeRate };
        })
    );
};

const dropdownProductByInventory = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; productName: string, inventory: string }): any => {
            const { id, productName, inventory, } = obj;
            return { value: id, label: `${productName} (موجودی: ${separateAmountWithCommas(inventory)})` };
        })
    );
};

const dropdownProductBrand = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; productName: any, brandName: string, exchangeRate: any, productSubUnitId: number, productSubUnitDesc: string, productMainUnitId: number, productMainUnitDesc: string, productBrandId: number, productBrandName: string, product: any, brand: any, }): any => {
            const { id, productName, brandName } = obj;
            return { value: id, label: `${productName}-(${brandName})`, exchangeRate: obj.product.exchangeRate, productSubUnitId: obj.product.productSubUnitId, productSubUnitDesc: obj.product.productSubUnitDesc, productMainUnitId: obj.product.productMainUnitId, productMainUnitDesc: obj.product.productMainUnitDesc, productBrandId: obj.id, productBrandName: obj.brand.name };
        })
    );
};

const dropdownStandard = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc,  id } = obj;
            return { value: id, label: desc };
        })
    );
};

const dropdownOrganzationBank = (data: any) => {
    return (
        data &&
        data?.map((obj: { accountOwner: string, accountNo: string, id: string, bank: {bankName: string} }): any => {
            const { accountOwner, accountNo,  id, bank } = obj;
            return { value: id, label: `${bank.bankName}- (ص.ح: ${accountOwner})-(ش.ح:${accountNo})` };
        })
    );
}

const dropdownState = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc,  id } = obj;
            return { value: id, label: desc };
        })
    );
};

const dropdownTypes = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc,  id } = obj;
            return { value: id, label: desc };
        })
    );
};

const dropdownUnit = (data: any) => {
    return (
        data &&
        data?.map((obj: { unitName: string, id: string }): any => {
            const { unitName,  id } = obj;
            return { value: id, label: unitName };
        })
    );
};

const dropdownCashDesk = (data: any) => {
    return (
        data &&
        data?.map((obj: { cashDeskDescription: string, id: string }): any => {
            const { cashDeskDescription,  id } = obj;
            return { value: id, label: cashDeskDescription };
        })
    );
};

const dropdownPermissions = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};


const dropdownApplicationMenu = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};

const dropdownPermissionsByMenu = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};

const dropdownRole = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name:string }): any => {
            const { name, id } = obj;
            return { value: id, label: name };
        })
    );
};

export {
    dropdownBrand,
    dropdownCustomer,
    dropdownBrandName,
    dropdownProduct,
    dropdownProductByBrandName,
    dropdownProductByInventory,
    dropdownProductBrand,
    dropdownStandard,
    dropdownOrganzationBank,
    dropdownState,
    dropdownTypes,
    dropdownUnit,
    dropdownCashDesk,
    dropdownPermissions,
    dropdownApplicationMenu,
    dropdownPermissionsByMenu,
    dropdownRole
}