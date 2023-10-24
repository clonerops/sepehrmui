import NumberToPersianWord from "number_to_persian_word";

export const sliceNumberPrice = (totalAmount) => {
   return NumberToPersianWord.sliceNumber(
        // totalAmount
        Math.floor(totalAmount / 10)
    )
}