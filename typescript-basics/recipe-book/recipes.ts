type Ingredient = {
  name: string;
  amountGrams: number;
};

type Recipe = {
  name: string;
  servings: number;
  vegetarian: boolean;
  ingredients: Ingredient[];
};

const recipe1: Recipe = {
  name: "Potato Salad",
  servings: 4,
  vegetarian: true,
  ingredients: [
    { name: "potatoes", amountGrams: 2000 },
    { name: "mayonnaise", amountGrams: 200 },
  ],
};

const recipe2: Recipe = {
  name: "Strawberry Matcha Latte",
  servings: 2,
  vegetarian: true,
  ingredients: [
    { name: "oatmilk", amountGrams: 20 },
    { name: "matcha", amountGrams: 2 },
  ],
};

function summarize(recipe: Recipe): string {
  return `${recipe.name} is made, among other ingredients, of ${recipe.ingredients[0].name} and ${recipe.ingredients[1].name}.`;
}

console.log(summarize(recipe1));
console.log(summarize(recipe2));
