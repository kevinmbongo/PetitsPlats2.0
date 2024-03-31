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

// const submitSearch = document.getElementById("submitSearch");

const searchInput = document.getElementById("searchbarInput");
searchInput.addEventListener("input", (event) =>{ 
  
  
  event.preventDefault()
  if(searchInput.value.length > 2){
    searchInput.classList.remove("is-invalid")
    validSearch(searchInput.value);
  }else {
    searchInput.classList.add("is-invalid"); 
    return false;
  }
  
  searchbar(searchInput.value);
});


