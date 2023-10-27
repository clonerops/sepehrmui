export const calculateTotalAmount = (data: any) => {
    const prices = data?.map((obj: any) =>
        Number(obj.productPrice?.replace(/,/g, "")) * Number(obj.proximateAmount?.replace(/,/g, ""))
    );
    const newPrices = [...prices];
    const newTotal = newPrices.reduce((acc: any, item) => acc + item, 0);
    return newTotal
}
