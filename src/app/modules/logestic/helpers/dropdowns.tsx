export const dropdownVehicleType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name:string }): any => {
            const { name, id } = obj;
            return { value: id, label: name };
        })
    );
};


export const dropdownProductLading = (data: any) => {
    return (
        data &&
        data?.map((obj: { productId: string, productName:string, id: number }): any => {
            const { productName, productId, id } = obj;
            return { value: id, label: productName, productId: productId };
        })
    );
};

export const dropdownTransferRemittanceStatus = (data: any) => {
    return (
        data &&
        data?.map((obj: { statusDesc:string, id: number }): any => {
            const { statusDesc, id } = obj;
            return { value: id, title: statusDesc };
        })
    );
};