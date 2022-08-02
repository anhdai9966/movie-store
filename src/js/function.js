export function isEmpty(object) {
  for (let property in object) {
    return false;
  }
  return true;
}