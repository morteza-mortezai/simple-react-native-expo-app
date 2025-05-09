export const toArabicDigits = (input: string | number): string => {
    return input.toString().replace(/\d/g, (digit) =>
      '٠١٢٣٤٥٦٧٨٩'[parseInt(digit)]
    );
  };