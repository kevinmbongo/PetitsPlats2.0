export function validSearch(balise) {
  let validRegExp = /^[^<>]*$/;

  if (validRegExp.test(balise))  {
    return true;
  } 
}
