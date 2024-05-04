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

  function some(recipe, selectedIngredient) {
    for (let l = 0; l < recipe.ingredients.length; l++) {
      if (recipe.ingredients[l].ingredient === selectedIngredient) {
        return true;
      }
    }
    return false;
  }

  filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    let filteredIngredients = false;
    let filteredApliance = false;
    let filteredUstensils = false;
    let filteredSearchBar = false;

    const searchbarValueLower = searchbarValue.toLocaleLowerCase();
    if (
      recipes[i].name.toLocaleLowerCase().includes(searchbarValueLower) ||
      recipes[i].description.toLocaleLowerCase().includes(searchbarValueLower)
    ) {
      filteredSearchBar = true;
    } else {
      for (let j = 0; j < recipes[i].ingredients.length; j++) {
        if (
          recipes[i].ingredients[j].ingredient.includes(searchbarValueLower)
        ) {
          filteredSearchBar = true;
        }
      }
    }

    const ingredientCondition = hasIngredients;
    for (let k = 0; k < selectedIngredients.length; k++) {
      if (!some(recipes[i], selectedIngredients[k])) {
        filteredIngredients = false;
        break;
      } else {
        filteredIngredients = true;
      }
    }
    if (filteredIngredients) {
      filteredRecipes.push(recipes[i]);
    }

    const applianceCondition = hasAppliances;
    for (let m = 0; m < selectedAppliances.length; m++) {
      if (recipes[i].appliance === selectedAppliances[m]) {
        filteredApliance = false;
        break;
      } else {
        filteredApliance = true;
      }
    }

    if (filteredApliance) {
      filteredRecipes.push(recipes[i]);
    }

    const utensilCondition = hasUtensils;
    for (let n = 0; n < selectedUtensils.length; n++) {
      for (let o = 0; o < recipes[i].ustensils.length; o++) {
        if (recipes[i].ustensils[o] === selectedUtensils[n]) {
          console.log(recipes[i].ustensils[o]);
          filteredUstensils = false;
          break;
        } else {
          filteredUstensils = true;
        }
      }
    }

    if (filteredUstensils) {
      filteredRecipes.push(recipes[i]);
    }
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
