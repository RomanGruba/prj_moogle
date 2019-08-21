export function handleFavorite(event) {
  let addToFavorite = {};

  if (
    event.target.closest(".icon").classList.contains("icon-star") &&
    event.target.closest(".icon").classList.contains("fill-white")
  ) {
    addToFavorite = this.renderedData.find(
      el => el.id == event.target.closest(".films-item").dataset.id
    );
    console.log(addToFavorite);
    if (JSON.parse(localStorage.getItem("favorites")) == null) {
      localStorage.setItem("favorites", JSON.stringify(addToFavorite));
      this.favoriteArr.push(addToFavorite);
    } else {
      this.favoriteArr = JSON.parse(localStorage.getItem("favorites"));
      this.favoriteArr.push(addToFavorite);
    }
  }

  if (
    event.target.closest(".icon").classList.contains("icon-star") &&
    event.target.closest(".icon").classList.contains("fill-gold")
  ) {
    this.favoriteArr = this.favoriteArr.filter(
      el => el.id !== Number(event.target.closest(".films-item").dataset.id)
    );
  }

  localStorage.setItem("favorites", JSON.stringify(this.favoriteArr));
}
