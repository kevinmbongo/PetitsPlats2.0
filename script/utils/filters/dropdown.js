import { store } from "../../../data/store.js";
import { recipesFilter } from "./recipesFilter.js";

const FILTER_DICT = [
  "selectedIngredients",
  "selectedAppliances",
  "selectedUtensils",
];

let ingredients = [];
let utensils = [];
let appliances = [];

function createDropdownItem(item, menu, container, filterType) {
  const li = document.createElement("li");
  li.classList.add("dropdown-item");

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn", "me-2", "m-auto");
  button.textContent = item;

  li.addEventListener("click", function () {
    const toastElement = document.createElement("div");
    toastElement.classList.add(
      "toast",
      "show",
      "align-items-center",
      "badge-bg",
      "border-0"
    );

    toastElement.setAttribute("role", "alert");
    toastElement.setAttribute("aria-live", "assertive");
    toastElement.setAttribute("aria-atomic", "true");

    const toastContent = document.createElement("div");
    toastContent.classList.add("d-flex");

    const toastBody = document.createElement("div");
    toastBody.classList.add("toast-body");
    toastBody.textContent = item;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("btn-close", "btn-close-black", "me-2", "m-auto");
    closeButton.setAttribute("data-bs-dismiss", "toast");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.addEventListener("click", () => {
      FILTER_DICT.includes(filterType) && store.deleteFilter(filterType, item);

      recipesFilter();
    });

    toastContent.appendChild(toastBody);
    toastContent.appendChild(closeButton);

    toastElement.appendChild(toastContent);

    container.appendChild(toastElement);

    FILTER_DICT.includes(filterType) && store.addFilter(filterType, item);

    recipesFilter();
    dropdown();
  });

  li.appendChild(button);
  menu.appendChild(li);
}

const dropdownMenuIngredients = document.getElementById("ingredientsMenuLi");

const dropdownMenuAppliance = document.getElementById("appliancesMenuLi");

const dropdownMenuUtensils = document.getElementById("utensilsMenuLi");

const badgeContainer = document.getElementById("badgeContainer");

export function dropdown() {
  console.log(store.recipesStore);

  store.recipesStore.forEach((recipe) => {
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }

    if (
      !recipe.ingredients.some(({ ingredient }) =>
        ingredients.includes(ingredient)
      )
    ) {
      recipe.ingredients.forEach(({ ingredient }) => {
        ingredients.push(ingredient);
      });
    }

    if (!recipe.ustensils.some((ustensil) => utensils.includes(ustensil))) {
      recipe.ustensils.forEach((ustensil) => {
        utensils.push(ustensil);
      });
    }
  });

  ingredients.forEach((ingredient) => {
    createDropdownItem(
      ingredient,
      dropdownMenuIngredients,
      badgeContainer,
      "selectedIngredients"
    );
  });

  appliances.forEach((appliance) => {
    createDropdownItem(
      appliance,
      dropdownMenuAppliance,
      badgeContainer,
      "selectedAppliances"
    );
  });

  utensils.forEach((ustensil) => {
    createDropdownItem(
      ustensil,
      dropdownMenuUtensils,
      badgeContainer,
      "selectedUtensils"
    );
  });

  function dropDownSearchbar(searchField, list, domElement, filterType) {
    searchField.addEventListener("input", (e) => {
      e.preventDefault();
      domElement.innerHTML = "";
      let newList = list.filter((item) =>
        item.toLocaleLowerCase().includes(searchField.value.toLocaleLowerCase())
      );

      newList.forEach((elm) => {
        createDropdownItem(elm, domElement, badgeContainer, filterType);
      });
    });
  }

  const searchIngredient = document.getElementById("searchIngredient");
  const searchAppliances = document.getElementById("searchAppliances");
  const searchUtensils = document.getElementById("searchUtensils");

  dropDownSearchbar(
    searchIngredient,
    ingredients,
    dropdownMenuIngredients,
    "selectedIngredients"
  );
  dropDownSearchbar(
    searchAppliances,
    appliances,
    dropdownMenuAppliance,
    "selectedAppliances"
  );
  dropDownSearchbar(
    searchUtensils,
    utensils,
    dropdownMenuUtensils,
    "selectedUtensils"
  );
}
