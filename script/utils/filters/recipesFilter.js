import { recipes } from "../../../data/recipes.js";
import { store } from "../../../data/store.js";
import { recipeCard } from "../../templates/card.js";

export function recipesFilter() {
  const cardsContainer = document.getElementById("cardsContainer");
  const searchInput = document.getElementById("searchbarInput");
  const recipeNumber = document.getElementById("recipeNumber");

  const searchbarValue = store.searchbarValue;
  const selectedIngredients = store.selectedIngredients;
  const selectedAppliances = store.selectedAppliances;
  const selectedUtensils = store.selectedUtensils;

  const filteredRecipes = recipes.filter((recipe) => {
    const hasSearchbarValue = searchbarValue.length > 0;
    const hasIngredients = selectedIngredients.length > 0;
    const hasAppliances = selectedAppliances.length > 0;
    const hasUtensils = selectedUtensils.length > 0;

    const searchbarValueCondition = hasSearchbarValue
      ? recipe.name
          .toLocaleLowerCase()
          .includes(searchbarValue.toLocaleLowerCase()) ||
        recipe.description
          .toLocaleLowerCase()
          .includes(searchbarValue.toLocaleLowerCase()) ||
        recipe.ingredients.some((c) => c.ingredient.includes(searchbarValue))
      : true;

    const ingredientCondition = hasIngredients
      ? recipe.ingredients.some(({ ingredient }) =>
          selectedIngredients.includes(ingredient)
        )
      : true;

    const applianceCondition = hasAppliances
      ? selectedAppliances.includes(recipe.appliance)
      : true;

    const utensilCondition = hasUtensils
      ? recipe.ustensils.some((ustensil) => selectedUtensils.includes(ustensil))
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
    Aucune recette ne contient  ces elements, vous pouvez chercher «
    tarte aux pommes », « poisson », etc.</span>
  </div>`;
  }

  filteredRecipes.forEach((recipe) => {
    const card = new recipeCard(recipe);
    const recipeArticles = card.getArticleDOM();

    cardsContainer.appendChild(recipeArticles);
    card.ingredientList();
  });

  recipeNumber.innerHTML = filteredRecipes.length;
}
