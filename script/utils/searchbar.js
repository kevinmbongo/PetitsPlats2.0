import { recipes } from "../../data/recipes.js";

export function searchbar() {
  let recipeNames = [];
  let findElement = [];
  recipes.forEach((recipe) => {
    recipeNames.push(recipe.name);

    if (recipe.name.includes("a")) {
      findElement.push(recipe.name);
      // console.log(findElement);
    }
  });
  return findElement;
}
