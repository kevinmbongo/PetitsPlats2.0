import { recipes } from "../../data/recipes.js";
import { recipeCard } from "../templates/card.js";

const cardsContainer = document.getElementById("cardsContainer");
const recipeNumber = document.getElementById("recipeNumber");
const searchInputValue = document.getElementById("searchbarInput").value;

export function searchbar(value,ArrayToFilter) {
 
  const findRecipe = ArrayToFilter.filter((recipe) => {
    return recipe.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || recipe.description.toLocaleLowerCase().includes(value.toLocaleLowerCase())|| recipe.ingredients.some(c => c.ingredient.includes(value));
  });
  cardsContainer.innerHTML = ""
  recipeNumber.innerHTML = findRecipe.length
 
  if(findRecipe.length < 1){
    const searchInputValue = document.getElementById("searchbarInput").value;

    cardsContainer.innerHTML = `<div class="alert alert-danger" role="alert">
    Aucune recette ne contient  "${searchInputValue}" vous pouvez chercher «
    tarte aux pommes », « poisson », etc.</span>
  </div>`;
  };
  
  return  findRecipe.forEach((recipe) => {
    const card = new recipeCard(recipe)       
    card.ingredientList();
    const recipeArticles = card.getArticleDOM();  
    cardsContainer.appendChild(recipeArticles);
  })
   
   
}

