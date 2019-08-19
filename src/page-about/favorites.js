export function setIdToLocalSotage() {
  const favoritesArr = [429203, 384018, 363088, 448358];
  localStorage.setItem("favorites", JSON.stringify(favoritesArr));
}
