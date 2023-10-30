export function separateAmountWithCommas(amount: number | string): string {
    if (typeof amount === 'number') {
      return amount.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else if (typeof amount === 'string') {
      const numericAmount = parseFloat(amount);
      if (!isNaN(numericAmount)) {
        return numericAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
    return '0';
  }

