import { recipes } from "../../data/recipes.js";
import { recipeCard } from "../templates/card.js";

const cardsContainer = document.getElementById("cardsContainer");
const recipeNumber = document.getElementById("recipeNumber");
const searchInputValue = document.getElementById("searchbarInput").value;

export function searchbar(value) {
 
  const findElement = recipes.filter((recipe) => {
    return recipe.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || recipe.description.toLocaleLowerCase().includes(value.toLocaleLowerCase());
  });
  cardsContainer.innerHTML = ""
  recipeNumber.innerHTML = findElement.length

  if(findElement.length < 1){
    const searchInputValue = document.getElementById("searchbarInput").value;

    cardsContainer.innerHTML = `<div class="alert alert-danger" role="alert">
    Aucune recette ne contient  "${searchInputValue}" vous pouvez chercher «
    tarte aux pommes », « poisson », etc.</span>
  </div>`;
  };
  
  return  findElement.forEach((recipe) => {
    const card = new recipeCard(recipe)       
    const recipeArticles = card.getArticleDOM();  
    cardsContainer.appendChild(recipeArticles);
    card.ingredientList();
  })
   
   
}

