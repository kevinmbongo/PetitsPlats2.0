import { recipes } from "../data/recipes.js";
import { recipeCard } from "./templates/card.js";
import { searchbar } from "./utils/searchbar.js";
import { validSearch } from "./utils/validSearch.js";
let recipeObject = {};

const cardsContainer = document.getElementById("cardsContainer");
recipes.forEach((recipe) => {
  recipeObject = recipe; 
  const card = new recipeCard(recipeObject);
  const recipeArticles = card.getArticleDOM();
 
  cardsContainer.appendChild(recipeArticles);
  card.ingredientList();
});

const submitSearch = document.getElementById("submitSearch");

submitSearch.addEventListener("click", (event) =>{ 
  const searchInputValue = document.getElementById("searchbarInput").value;
  
  event.preventDefault()
  if(searchInputValue.length > 2){
    validSearch(searchInputValue);
  }else {
    console.error("Veuillez saisir une recherche valide.");
    return false;
  }
  
  searchbar(searchInputValue);
});


