import { recipes } from "../../../data/recipes.js";
import { store } from "../../../data/store.js";
import { recipeCard } from "../../templates/card.js";

import { dropdown } from "./dropdown.js";

function matchRecipes(recipe, searchbarValue) {
  if (searchbarValue.length > 2) {
    if (
      recipe.name
        .toLocaleLowerCase()
        .includes(searchbarValue.toLocaleLowerCase()) ||
      recipe.description
        .toLocaleLowerCase()
        .includes(searchbarValue.toLocaleLowerCase())
    ) {
      return true;
    } else {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (recipe.ingredients[j].ingredient.includes(searchbarValue)) {
          return true;
        }
      }
      return false;
    }
  }
  return true;
}

export function recipesFilter() {
  const cardsContainer = document.getElementById("cardsContainer");
  const recipeNumber = document.getElementById("recipeNumber");

  const searchbarValue = store.searchbarValue.toLowerCase();
  const selectedIngredients = store.selectedIngredients;
  const selectedAppliances = store.selectedAppliances;
  const selectedUtensils = store.selectedUtensils;

  let filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeIngredients = [];
    for (let ingredient of recipe.ingredients) {
      recipeIngredients.push(ingredient.ingredient.toLowerCase());
    }

    const recipeAppliance = recipe.appliance.toLowerCase();

    const recipeUtensils = [];
    for (let utensil of recipe.ustensils) {
      recipeUtensils.push(utensil.toLowerCase());
    }

    const hasSearchbarValue = matchRecipes(recipe, searchbarValue);

    const hasIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selectedIngredient) =>
        recipeIngredients.includes(selectedIngredient.toLowerCase())
      );

    const hasAppliances =
      selectedAppliances.length === 0 ||
      selectedAppliances.includes(recipeAppliance);

    const hasUtensils =
      selectedUtensils.length === 0 ||
      selectedUtensils.every((selectedUtensil) =>
        recipeUtensils.includes(selectedUtensil.toLowerCase())
      );

    if (hasSearchbarValue && hasIngredients && hasAppliances && hasUtensils) {
      filteredRecipes.push(recipe);
    }
  }

  cardsContainer.innerHTML = "";

  if (filteredRecipes.length < 1) {
    cardsContainer.innerHTML = `<div class="alert alert-danger" role="alert">
    Aucune recette ne contient "${searchbarValue} ${selectedIngredients} ${selectedAppliances} ${selectedUtensils}", vous pouvez chercher «
    tarte aux pommes », « poisson », etc.</span>
  </div>`;
  }

  store.addRecipesStore(filteredRecipes);

  store.recipesStore.forEach((recipe) => {
    const card = new recipeCard(recipe);
    const recipeArticles = card.getArticleDOM();

    cardsContainer.appendChild(recipeArticles);
    card.ingredientList();
    dropdown();
  });

  recipeNumber.innerHTML = store.recipesStore.length;
}
