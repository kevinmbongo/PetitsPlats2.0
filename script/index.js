import { recipes } from "../data/recipes.js";
import { recipeCard } from "./card.js";
let recipeObject = {};
recipes.forEach((recipe) => {
  recipeObject = recipe;

  const cardsContainer = document.getElementById("cards_container");
  const card = new recipeCard(recipeObject);
  const recipeArticles = card.getArticleDOM();

  cardsContainer.appendChild(recipeArticles);
  card.ingredientsTest();
});
