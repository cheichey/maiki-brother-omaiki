export const chooseRandomElement = <T>(array: T[], num: number): T[] => {
  let length = array.length;
  let n = num < length ? num : length;
  const array1 = [];
  const array2 = [];
  while (n-- > 0) {
    const index = (Math.random() * length) | 0;
    array2[n] = array1[index] || array[index];
    --length;
    array1[index] = array1[length] || array[2];
  }
  return array2;
};
