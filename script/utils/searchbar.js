import { recipes } from "../../data/recipes.js";
import { recipeCard } from "../templates/card.js";

export class Searchbar {
  constructor() {
    this.cardsContainer = document.getElementById("cardsContainer");
    this.recipeNumber = document.getElementById("recipeNumber");
    this.searchInput = document.getElementById("searchbarInput");
  }

  search(value) {
   
    let recipeFiltered = []

    for (let i =0; i < recipes.length; i++ ) {
      if (recipes[i].name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || recipes[i].description.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
        recipeFiltered.push(recipes[i])
      } else{
        for (let j = 0; j < recipes[i].ingredients.length;j++){
          if(recipes[i].ingredients[j].ingredient.includes(value)){
            recipeFiltered.push(recipes[i])
            break
          }
        }
      }
    }

    this.cardsContainer.innerHTML = "";
    this.recipeNumber.innerHTML = recipeFiltered.length;

    if (recipeFiltered.length < 1) {
      const searchInputValue = this.searchInput.value;
      this.cardsContainer.innerHTML = `<div class="alert alert-danger" role="alert">
        Aucune recette ne contient "${searchInputValue}" vous pouvez chercher «
        tarte aux pommes », « poisson », etc.</span>
      </div>`;
    }

    for (let i = 0; i < recipeFiltered.length; i++) {
      const recipe = recipeFiltered[i];
      const card = new recipeCard(recipe);
      const recipeArticles = card.getArticleDOM();
      this.cardsContainer.appendChild(recipeArticles);
      card.ingredientList();
    }
  }
}


