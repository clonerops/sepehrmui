export const calculateTotalAmount = (data: any, orderService: any) => {
    const prices = data?.map((obj: any) =>
        Number(obj.productPrice?.replace(/,/g, "")) * Number(obj.proximateAmount?.replace(/,/g, ""))
    );

    const sericePrices = orderService?.map((obj: any) => Number(obj.description?.replace(/,/g, "")))

    const newPrices = [...prices];
    const newServicePrices = [...sericePrices];
    const newTotal = newPrices.reduce((acc: any, item) => acc + item, 0) + newServicePrices.reduce((acc: any, item) => acc + item, 0);
    return newTotal
}

export const calculateProximateAmount = (data: any, orderPayment: any, orderService: any) => {
    const prices = data?.map((obj: any) =>
        Number(obj.productPrice?.replace(/,/g, "")) * Number(obj.proximateAmount?.replace(/,/g, ""))
    );

    const orderPrices = orderPayment?.map((obj: any) => Number(obj.amount?.replace(/,/g, "")))
    const orderServices = orderService?.map((obj: any) => Number(obj.description?.replace(/,/g, "")))

    const newPrices = [...prices];
    const newPaymentPrices = [...orderPrices];
    const newServicesPrices = [...orderServices];
    console.log("newPrices", newPrices)
    console.log("newPaymentPrices", newPaymentPrices)
    const newTotal =
        (newPrices.reduce((acc: any, item) => acc + item, 0) + newServicesPrices.reduce((acc: any, item) => acc + item, 0)) 
        -
        newPaymentPrices.reduce((acc: any, item) => acc + item, 0);
    return newTotal
}
