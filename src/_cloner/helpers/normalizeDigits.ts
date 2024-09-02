// Function to normalize Persian and Arabic digits to Latin digits
export const normalizeDigits = (input: string) => {
    const persianToLatinMap: { [key: string]: string } = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
    };

    return input.replace(/[۰-۹]/g, (match) => persianToLatinMap[match] || match);
};