// helper function to get number out of string
function getNumber(word: string): number {
  const match = word.match(/\d/);
  // console.log("match: ", match);

  if (!match) {
    console.error("no number found");
    throw new Error("no number found");
  }

  const foundNumberString = match[0];
  const foundNumber = parseInt(foundNumberString);

  return foundNumber;
}

// function to sort input according to number in string
function sortString(input: string): string {
  if (input === "") return "";

  const splitString: string[] = input.split(" ");
  // console.log("split string:", splitString);

  let sortedInput = splitString.sort((a, b) => {
    return getNumber(a) - getNumber(b);
  });
  // console.log("sorted input: ", sortedInput);

  return sortedInput.join(" ");
}

// console.log(getNumber("is2"));
console.log(sortString(""));
console.log(sortString("is2 Thi1s T4est 3a"));
console.log(sortString("4of Fo1r pe6ople g3ood th5e the2"));
