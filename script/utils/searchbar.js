import { recipes } from "../../data/recipes.js";
import { recipeCard } from "../templates/card.js";

export class Searchbar {
  constructor() {
    this.cardsContainer = document.getElementById("cardsContainer");
    this.recipeNumber = document.getElementById("recipeNumber");
    this.searchInput = document.getElementById("searchbarInput");
  }

  search(value) {
    const findRecipe = recipes.filter((recipe) => {
      return recipe.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || recipe.description.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });

    this.cardsContainer.innerHTML = "";
    this.recipeNumber.innerHTML = findRecipe.length;

    if (findRecipe.length < 1) {
      const searchInputValue = this.searchInput.value;
      this.cardsContainer.innerHTML = `<div class="alert alert-danger" role="alert">
        Aucune recette ne contient "${searchInputValue}" vous pouvez chercher «
        tarte aux pommes », « poisson », etc.</span>
      </div>`;
    }

    for (let i = 0; i < findRecipe.length; i++) {
      const recipe = findRecipe[i];
      const card = new recipeCard(recipe);
      const recipeArticles = card.getArticleDOM();
      this.cardsContainer.appendChild(recipeArticles);
      card.ingredientList();
    }
  }
}


