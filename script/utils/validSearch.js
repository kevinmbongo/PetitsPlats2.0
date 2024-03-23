export function validSearch(balise) {
  let emailRegExp = /[a-zA-Z0-9._-]/;
  if (emailRegExp.test(balise.value && balise.value.length < 2)) {
    console.log("true");
    return true;
  } else {
    console.log("Error");
    return false;
  }
}
