function findMissingLetter(letters: string[]): string {
  let missingLetter: string = "";
  const charCodes: number[] = letters.map((letter) => letter.charCodeAt(0));

  for (let i = 0; i < charCodes.length; i++) {
    if (charCodes[i + 1] - charCodes[i] !== 1) {
      missingLetter = String.fromCharCode(charCodes[i] + 1);
      break;
    }
  }

  return missingLetter;
}

console.log(findMissingLetter(["a", "b", "c", "d", "f"]));
console.log(findMissingLetter(["O", "Q", "R", "S"]));
