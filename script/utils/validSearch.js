import { recipes } from "../../data/recipes.js";
import { searchbar } from "./searchbar.js";

export function validSearch(balise) {
  let validRegExp = /^[^<>]*$/;

  if (validRegExp.test(balise))  {
    return true;
  } 
}
export function validSearchField(searchField,searchList){
  searchField.addEventListener("input", (event) =>{ 
      event.preventDefault()
      if(searchField.value.length > 2){
          searchField.classList.remove("is-invalid")
        validSearch(searchField.value);
        
      }else {
          searchField.classList.add("is-invalid"); 
        return false;
      }
      searchbar(searchField.value,searchList);
    });
}