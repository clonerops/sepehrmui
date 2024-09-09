export const normalizeDigitsAndWords = (input: string): string => {
    // Mapping of Persian digits to Latin digits
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

    // Mapping of Arabic letters to Persian letters
    const arabicToPersianMap: { [key: string]: string } = {
        'ك': 'ک',
        'ي': 'ی',
        'ى': 'ی',
        'ة': 'ه',
        'إ': 'ا',
        'أ': 'ا',
        'ؤ': 'و',
        'ئ': 'ی',
        'ﻻ': 'لا',
    };

    // Replace Persian digits with Latin digits
    const normalizedDigits = input.replace(/[۰-۹]/g, (match) => persianToLatinMap[match] || match);

    // Replace Arabic letters with Persian letters
    const normalizedWords = normalizedDigits.replace(/[كيىةإأؤئﻻ]/g, (match) => arabicToPersianMap[match] || match);

    return normalizedWords;
};
