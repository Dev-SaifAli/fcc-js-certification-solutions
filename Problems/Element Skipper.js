function dropElements(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return arr.slice(i);
    } 
  }
  return [];
}
console.log(
  dropElements([1, 1, 2, 1, 1], function (n) {
    return n === 2;
  }),
);
