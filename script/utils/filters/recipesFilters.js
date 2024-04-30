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

  const filteredRecipes = recipes.filter((recipe) => {
    const hasSearchbarValue = searchbarValue.length > 2;
    const hasIngredients = selectedIngredients.length > 0;
    const hasAppliances = selectedAppliances.length > 0;
    const hasUtensils = selectedUtensils.length > 0;

    const searchbarValueCondition = hasSearchbarValue
      ? (() => {
          const searchbarValueLower = searchbarValue.toLocaleLowerCase();
          for (let i = 0; i < recipe.ingredients.length; i++) {
            if (
              recipe.name.toLocaleLowerCase().includes(searchbarValueLower) ||
              recipe.description
                .toLocaleLowerCase()
                .includes(searchbarValueLower)
            ) {
              return true;
            } else {
              for (let j = 0; j < recipes[i].ingredients.length; j++) {
                if (
                  recipes[i].ingredients[j].ingredient.includes(
                    searchbarValueLower
                  )
                ) {
                  return true;
                }
              }
            }
          }
          return false;
        })()
      : true;

    const ingredientCondition = hasIngredients
      ? selectedIngredients.every((ingredient) =>
          recipe.ingredients.map((c) => c.ingredient).includes(ingredient)
        )
      : true;

    const applianceCondition = hasAppliances
      ? selectedAppliances.every((appliance) =>
          recipe.appliance.includes(appliance)
        )
      : true;

    const utensilCondition = hasUtensils
      ? selectedUtensils.every((ustensil) =>
          recipe.ustensils.includes(ustensil)
        )
      : true;
    return (
      searchbarValueCondition &&
      ingredientCondition &&
      applianceCondition &&
      utensilCondition
    );
  });

  cardsContainer.innerHTML = "";

  if (filteredRecipes.length < 1) {
    cardsContainer.innerHTML = `<div class="alert alert-danger" role="alert">
    Aucune recette ne contient "${searchbarValue}", vous pouvez chercher «
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
