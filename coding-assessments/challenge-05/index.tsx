function whoLikesIt(names: string[]): string {
  if (names.length === 1) return `${names[0]} likes this`;
  if (names.length === 2) return `${names[0]} and ${names[1]} likes this`;
  if (names.length === 3)
    return `${names[0]}, ${names[1]} and ${names[2]} like this`;
  if (names.length > 3)
    return `${names[0]}, ${names[1]} and ${names.length - 2} others like this`;
  return "";
}

console.log(whoLikesIt([]));
console.log(whoLikesIt(["Peter"]));
console.log(whoLikesIt(["Jacob", "Alex"]));
console.log(whoLikesIt(["Max", "John", "Mark"]));
console.log(whoLikesIt(["Alex", "Jacob", "Mark", "Max"]));
