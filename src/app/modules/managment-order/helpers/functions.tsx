import _ from 'lodash'

export const calculateTotalAmount = (data: any, orderService: any) => {
    const prices = data?.map((obj: any) =>
        Number(obj.price) * Number(obj.proximateAmount?.replace(/,/g, ""))
    );

    const sericePrices = orderService?.map((obj: any) => Number(obj.description?.replace(/,/g, "")))

    const newPrices = [...prices];
    const newServicePrices = [...sericePrices];
    const newTotal = newPrices.reduce((acc: any, item) => acc + item, 0) + newServicePrices.reduce((acc: any, item) => acc + item, 0);
    return newTotal
}

export const calculateTotalAmountOptimized = (data: any, orderServices: any) => {
    const prices = _.map(data, (obj: {price: number, proximateAmount: number}) => +obj.price + +obj.proximateAmount)
    const servicePrices = _.map(orderServices, (obj: {description: number}) => obj.description)

    const newPrices = [...prices];
    const newServicePrices = [...servicePrices];
    const newTotal = 
        newPrices.reduce((acc: any, item) => acc + item, 0)
         + 
        newServicePrices.reduce((acc: any, item) => acc + item, 0);
    return newTotal
}


export const calculateProximateAmount = (data: any, orderPayment: any, orderService: any) => {
    const prices = data?.map((obj: any) =>
        Number(obj.price) * Number(obj.proximateAmount?.replace(/,/g, ""))
    );

    const orderPrices = orderPayment?.map((obj: any) => Number(obj.amount?.replace(/,/g, "")))
    const orderServices = orderService?.map((obj: any) => Number(obj.description?.replace(/,/g, "")))

    const newPrices = [...prices];
    const newPaymentPrices = [...orderPrices];
    const newServicesPrices = [...orderServices];
    const newTotal =
        (newPrices.reduce((acc: any, item) => acc + item, 0) + newServicesPrices.reduce((acc: any, item) => acc + item, 0)) 
        -
        newPaymentPrices.reduce((acc: any, item) => acc + item, 0);
    return newTotal
}



