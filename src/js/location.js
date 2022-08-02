let loc = window.location;
function show() {
  console.log(loc);
}
window.addEventListener('load',show);
window.addEventListener('hashchange', show);