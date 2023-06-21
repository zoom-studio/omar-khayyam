export const modulus = (number1: number, number2: number) => {
  return number1 - number2 * Math.floor(number1 / number2)
}
