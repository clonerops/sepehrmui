import { separateAmountWithCommas } from "./seprateAmount";

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
        data?.map((obj: { firstName: string; lastName: string, id: string, customerValidityColorCode: string }): any => {
            const { firstName, lastName, id, customerValidityColorCode } = obj;
            return { value: id, label: `${firstName} ${lastName}` , customerValidityColorCode: customerValidityColorCode };
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
            const { desc, id } = obj;
            return { value: id, label: desc };
        })
    );
};

const dropdownOrganzationBank = (data: any) => {
    return (
        data &&
        data?.map((obj: { accountOwner: string, accountNo: string, id: string, bank: { bankName: string } }): any => {
            const { accountOwner, accountNo, id, bank } = obj;
            return { value: id, label: `${bank.bankName}- (ص.ح: ${accountOwner})-(ش.ح:${accountNo})` };
        })
    );
}

const dropdownState = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc, id } = obj;
            return { value: id, label: desc };
        })
    );
};

const dropdownTypes = (data: any) => {
    return (
        data &&
        data?.map((obj: { desc: string, id: string }): any => {
            const { desc, id } = obj;
            return { value: id, label: desc };
        })
    );
};

const dropdownUnit = (data: any) => {
    return (
        data &&
        data?.map((obj: { unitName: string, id: string }): any => {
            const { unitName, id } = obj;
            return { value: id, label: unitName };
        })
    );
};

const dropdownCashDesk = (data: any) => {
    return (
        data &&
        data?.map((obj: { cashDeskDescription: string, id: string }): any => {
            const { cashDeskDescription, id } = obj;
            return { value: id, label: cashDeskDescription };
        })
    );
};

const dropdownPermissions = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description: string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};


const dropdownApplicationMenu = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description: string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};

const dropdownPermissionsByMenu = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description: string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};

const dropdownRole = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name: string }): any => {
            const { name, id } = obj;
            return { value: id, label: name };
        })
    );
};

const dropdownReceivePaymentResource = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: any; desc: any }): any => {
            const { id, desc } = obj;
            return { value: id, label: desc };
        })
    );
};

const dropdownIncome = (data: any) => {
    return (
        data &&
        data?.map((obj: { incomeDescription: string, id: string }): any => {
            const { incomeDescription, id } = obj;
            return { value: id, label: incomeDescription };
        })
    );
};

const dropdownPettyCash = (data: any) => {
    return (
        data &&
        data?.map((obj: { pettyCashDescription: string, mobileNo: string, id: string }): any => {
            const { pettyCashDescription, mobileNo, id } = obj;
            return { value: id, label: `${pettyCashDescription} - (${mobileNo})` };
        })
    );
};

const dropdownCost = (data: any) => {
    return (
        data &&
        data?.map((obj: { costDescription: string, id: string }): any => {
            const { costDescription, id } = obj;
            return { value: id, label: costDescription };
        })
    );
};


const dropdownVehicleType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name: string }): any => {
            const { name, id } = obj;
            return { value: id, label: name };
        })
    );
};


const dropdownProductLading = (data: any) => {
    return (
        data &&
        data?.map((obj: { productId: string, productName: string, id: number }): any => {
            const { productName, productId, id } = obj;
            return { value: id, label: productName, productId: productId };
        })
    );
};

const dropdownTransferRemittanceStatus = (data: any) => {
    return (
        data &&
        data?.map((obj: { statusDesc: string, id: number }): any => {
            const { statusDesc, id } = obj;
            return { value: id, title: statusDesc };
        })
    );
};


const dropdownOrderSendType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description: string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};
const dropdownPurchaseOrderSendType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, sendTypeDesc: string }): any => {
            const { sendTypeDesc, id } = obj;
            return { value: id, label: sendTypeDesc };
        })
    );
};
const dropdownRentPaymentType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, desc: string }): any => {
            const { desc, id } = obj;
            return { value: id, label: desc };
        })
    );
};
const dropdownPurchaseRentPaymentType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, typeDesc: string }): any => {
            const { typeDesc, id } = obj;
            return { value: id, label: typeDesc };
        })
    );
};
const dropdownPurchaseInvoice = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, desc: string }): any => {
            const { desc, id } = obj;
            return { value: id, label: desc };
        })
    );
};
const dropdownInvoiceType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, typeDesc: string }): any => {
            const { typeDesc, id } = obj;
            return { value: id, label: typeDesc };
        })
    );
};
const dropdownWarehouseType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description: string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};
const dropdownWarehouses = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name: string, warehouseTypeId: number }): any => {
            const { name, id, warehouseTypeId } = obj;
            return { value: id, label: name, warehouseTypeId: warehouseTypeId };
        })
    );
};
const dropdownExitType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, title: string }): any => {
            const { title, id } = obj;
            return { value: id, label: title };
        })
    );
};
const dropdownOrderExitType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, exitTypeDesc: string }): any => {
            const { exitTypeDesc, id } = obj;
            return { value: id, label: exitTypeDesc };
        })
    );
};
const dropdownTemporaryType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, title: string }): any => {
            const { title, id } = obj;
            return { value: id, label: title };
        })
    );
};
const dropdownServices = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description: string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};
const dropdownCustomerCompanies = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, companyName: string }): any => {
            const { companyName, id } = obj;
            return { value: id, label: companyName };
        })
    );
};


const dropdownShareholders = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, shareHolderCode: number, firstName: string, lastName: string }): any => {
            const { shareHolderCode, id, firstName, lastName } = obj;
            return { value: id, label: `${firstName} ${lastName} - (${shareHolderCode})` };
        })
    );
};


const dropdownOfficialBank = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, bankName: string }): any => {
            const { bankName, id } = obj;
            return { value: id, label: bankName };
        })
    );
};

const dropdownProductType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, desc: string }): any => {
            const { desc, id } = obj;
            return { value: id, label: desc };
        })
    );
};

const dropdownPhoneBookType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, typeDescription: string }): any => {
            const { typeDescription, id } = obj;
            return { value: id, label: typeDescription };
        })
    );
};

const dropdownCustomerLabelType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, labelTypeDesc: string }): any => {
            const { labelTypeDesc, id } = obj;
            return { value: id, label: labelTypeDesc };
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
    dropdownRole,
    dropdownReceivePaymentResource,
    dropdownIncome,
    dropdownPettyCash,
    dropdownCost,
    dropdownVehicleType,
    dropdownProductLading,
    dropdownTransferRemittanceStatus,
    dropdownOrderSendType,
    dropdownPurchaseOrderSendType,
    dropdownRentPaymentType,
    dropdownPurchaseRentPaymentType,
    dropdownPurchaseInvoice,
    dropdownInvoiceType,
    dropdownWarehouseType,
    dropdownWarehouses,
    dropdownExitType,
    dropdownOrderExitType,
    dropdownTemporaryType,
    dropdownServices,
    dropdownCustomerCompanies,
    dropdownShareholders,
    dropdownOfficialBank,
    dropdownProductType,
    dropdownPhoneBookType,
    dropdownCustomerLabelType
}