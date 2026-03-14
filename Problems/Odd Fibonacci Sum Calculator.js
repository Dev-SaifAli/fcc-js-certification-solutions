function sumFibs(limit) {
  if (limit < 0) {
    return [];
  }
  let sequence = [];
  let n1 = 0;
  let n2 = 1;
  let nextTerm = n1 + n2;
  if (n1 <= limit) sequence.push(n1);
  if (n2 <= limit) sequence.push(n2);
  while (nextTerm <= limit) {
    sequence.push(nextTerm);
    n1 = n2;
    n2 = nextTerm;
    nextTerm = n1 + n2;
  }

  // Sum of old terms in fibonacci sequence
  let sum = 0;
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] % 2 !== 0) {
      sum += sequence[i];
    }
  }
  return sum;
}
console.log(sumFibs(5));
