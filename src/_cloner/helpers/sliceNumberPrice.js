import NumberToPersianWord from "number_to_persian_word";

// تومان
export const sliceNumberPrice = (totalAmount) => {
   return NumberToPersianWord.sliceNumber(
        // totalAmount
        Math.floor(totalAmount / 10)
    )
}
// ریال
export const sliceNumberPriceRial = (totalAmount) => {
   return NumberToPersianWord.sliceNumber(
        totalAmount
    )
}