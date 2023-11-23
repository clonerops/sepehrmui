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
        data?.map((obj: { productId: number, productName:string }): any => {
            const { productName, productId } = obj;
            return { value: productId, label: productName };
        })
    );
};