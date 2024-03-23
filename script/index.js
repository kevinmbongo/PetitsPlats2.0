import { recipes } from "../data/recipes.js";
import { recipeCard } from "./templates/card.js";
import { searchbar } from "./utils/searchbar.js";
import { validSearch } from "./utils/validSearch.js";
let recipeObject = {};
recipes.forEach((recipe) => {
  recipeObject = recipe;

  const cardsContainer = document.getElementById("cards_container");
  const card = new recipeCard(recipeObject);
  const recipeArticles = card.getArticleDOM();

  cardsContainer.appendChild(recipeArticles);
  card.ingredientsTest();
});
const submitSearch = document.getElementById("submitSearch");
submitSearch.addEventListener("click", () => validSearch(submitSearch));

searchbar();
