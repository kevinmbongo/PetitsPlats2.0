import { recipes } from "../../../data/recipes.js";
import { validSearchField } from "../validSearch.js";

let ingredients = []
let ustensils = []
let appliances = []


function createDropdownItem(item, menu, container) {
    const li = document.createElement("li");
    li.classList.add("dropdown-item");
    li.innerHTML = `<span>${item}</span>`;
    li.addEventListener("click", function() {
        container.innerHTML += ` <div class="toast show align-items-center badge-bg border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body">
                ${item}
              </div>
              <button type="button" class="btn-close btn-close-black me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>`;
    });
    menu.appendChild(li);
}

export function dropdown(){
    const dropdownMenuIngrédients = document.getElementById("dropdownMenuIngredient")
     const dropdownMenuAppliance = document.getElementById("dropdownMenuAppliances")
    
    const dropdownMenuUstensiles = document.getElementById("dropdownMenuUstensiles")  
    const badgeContainer = document.getElementById("badgeContainer")  

    recipes.forEach((recipe)=>{
        if (!appliances.includes(recipe.appliance)) {
    appliances.push(recipe.appliance); 
}


if (!recipe.ingredients.some(({ ingredient }) => ingredients.includes(ingredient))) {
    recipe.ingredients.forEach(({ ingredient }) => {
        ingredients.push(ingredient);
    });
}
if (!recipe.ustensils.some((ustensil ) => ustensils.includes(ustensil))) {
    recipe.ustensils.forEach((ustensil ) => {
        ustensils.push(ustensil);
    });
}
    })
  

ingredients.forEach(ingredient => {
    createDropdownItem(ingredient, dropdownMenuIngrédients, badgeContainer);
});

appliances.forEach(appliance => {
    createDropdownItem(appliance, dropdownMenuAppliance, badgeContainer);
});

ustensils.forEach(ustensil => {
    createDropdownItem(ustensil, dropdownMenuUstensiles, badgeContainer);
});

    
    const searchIngredient = document.getElementById("searchIngredient");
    const searchAppliances = document.getElementById("searchAppliances");
    const searchUstensils = document.getElementById("searchUstensils");

    validSearchField(searchIngredient,ingredients) 
    validSearchField(searchAppliances,appliances) 
    validSearchField(searchUstensils,ustensils) 

}