import { recipes } from "../../data/recipes.js";
import { recipeCard } from "../templates/card.js";

const cardsContainer = document.getElementById("cardsContainer");
const recipeNumber = document.getElementById("recipeNumber");

export function searchbar(value) {
 
  const findElement = recipes.filter((recipe) => {
    return recipe.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || recipe.description.toLocaleLowerCase().includes(value.toLocaleLowerCase());
  });
  console.log(findElement);
  cardsContainer.innerHTML = ""
  recipeNumber.innerHTML = findElement.length
  return  findElement.forEach((recipe) => {
    const card = new recipeCard(recipe)       
    const recipeArticles = card.getArticleDOM();  
    cardsContainer.appendChild(recipeArticles);
    card.ingredientList();
  })
   
   
}

