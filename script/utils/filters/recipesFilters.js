import { recipes } from "../../../data/recipes.js";
import { store } from "../../../data/store.js";
import { recipeCard } from "../../templates/card.js";

import { dropdown } from "./dropdown.js";

export function recipesFilter() {
  const cardsContainer = document.getElementById("cardsContainer");
  const recipeNumber = document.getElementById("recipeNumber");

  const searchbarValue = store.searchbarValue;
  const selectedIngredients = store.selectedIngredients;
  const selectedAppliances = store.selectedAppliances;
  const selectedUtensils = store.selectedUtensils;

  const hasSearchbarValue = searchbarValue.length > 2;
  const hasIngredients = selectedIngredients.length > 0;
  const hasAppliances = selectedAppliances.length > 0;
  const hasUtensils = selectedUtensils.length > 0;

  let filteredRecipes = [...recipes];
  let filteredIngredients = [...recipes];

  if (hasSearchbarValue) {
    filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const searchbarValueLower = searchbarValue.toLocaleLowerCase();
      if (
        recipes[i].name.toLocaleLowerCase().includes(searchbarValueLower) ||
        recipes[i].description.toLocaleLowerCase().includes(searchbarValueLower)
      ) {
        filteredRecipes.push(recipes[i]);
      } else {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          if (
            recipes[i].ingredients[j].ingredient.includes(searchbarValueLower)
          ) {
            filteredRecipes.push(recipes[i]);
          }
        }
      }
    }
  }

  if (hasIngredients) {
    filteredIngredients = [];
    for (let i = 0; i < filteredRecipes; i++) {
      for (let j = 0; j < filteredRecipes[i].ingredients.length; j++) {}
    }
    for (let k = 0; k < selectedIngredients.length; k++) {
      if (selectedIngredients[k] == filteredRecipes[i].ingredients[j]) {
        filteredIngredients.push(filteredRecipes[i]);
      }
    }
    filteredRecipes = filteredIngredients;
  }

  // const ingredientCondition = hasIngredients
  //   ? selectedIngredients.every((ingredient) =>
  //       recipe.ingredients.some(
  //         (recipeIngredient) => recipeIngredient.ingredient === ingredient
  //       )
  //     )
  //   : true;

  // const applianceCondition = hasAppliances
  //   ? selectedAppliances.every((appliance) =>
  //       recipe.appliance.includes(appliance)
  //     )
  //   : true;

  // const utensilCondition = hasUtensils
  //   ? selectedUtensils.every((utensil) => recipe.ustensils.includes(utensil))
  //   : true;

  cardsContainer.innerHTML = "";

  if (filteredRecipes.length < 1) {
    cardsContainer.innerHTML = `<div class="alert alert-danger" role="alert">
    Aucune recette ne contient "${searchbarValue}", vous pouvez chercher «
    tarte aux pommes », « poisson », etc.</span>
  </div>`;
    filteredRecipes = [...recipes];
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