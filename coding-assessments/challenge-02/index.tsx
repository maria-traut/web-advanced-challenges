function maskify (input: number | string): string {
// console.log("input: ", input);

const inputString: string = input.toString();
// console.log("input as string: ", inputString);

let lastFourCharacters: string = inputString.slice(-4);
// console.log("last four: ", lastFourCharacters);

const hashtag: string = "#"
let maskedCharacters: string = ""

for (let i = 0; i < inputString.length - 4; i++) {
maskedCharacters += hashtag;
}

// console.log("masked: ", maskedCharacters);
// console.log(maskedCharacters + lastFourCharacters);

return (maskedCharacters + lastFourCharacters);
}

console.log(maskify("Nananananananananananananananana Batman!"));