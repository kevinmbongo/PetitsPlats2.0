import { recipes } from "../data/recipes.js";
import { recipeCard } from "./templates/card.js";
import { dropdown } from "./utils/filters/dropDown.js";
import { searchbar } from "./utils/searchbar.js";
import {  validSearchField } from "./utils/validSearch.js";
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

validSearchField(searchInput,recipes)
dropdown()


