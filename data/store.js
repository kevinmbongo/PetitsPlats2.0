export const store = {
  searchbarValue: "",

  selectedIngredients: [],

  selectedAppliances: [],

  selectedUtensils: [],

  addSearchValue(item) {
    this.searchbarValue = item;
  },

  addFilter(category, item) {
    this[category].push(item);
  },

  deleteFilter(category, item) {
    this[category] = this[category].filter((elt) => elt !== item);
  },
};
