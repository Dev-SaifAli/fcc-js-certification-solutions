function findLongestWordLength(string) {
  const words = string.split(" ");
  let maxLength = 0;

  for (let i = 0; i < words.length; i++) {
    if (maxLength < words[i].length) {
      maxLength = words[i].length;
    }
  }
  return maxLength;
}

console.log(
  findLongestWordLength("The quick brown fox jumped over the lazy dog"),
);
