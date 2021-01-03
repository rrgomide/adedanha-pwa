/**
 * Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
 */
export function helperGetRandomValueFromArray(array) {
  const min = 0;
  const max = array.length - 1;
  const position = Math.floor(Math.random() * (max - min + 1) + min);
  return array[position];
}
