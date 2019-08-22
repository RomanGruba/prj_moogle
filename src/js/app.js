// class App {
//   constructor() {
//     // привязки к HTML
//     this.refs = {
//       // коробка для "preloader"
//       pageWrapper: document.querySelector("#page_wrapper"),
//       // "preloader"
//       preloader: document.querySelector("#preloader"),
//       // список "ul" в "grid"
//       filmsList: document.querySelector(".films-list")
//     };

//     // слушатель на DOM
//     document.addEventListener("DOMContentLoaded", this.closestPreloader.bind(this));
//   }

//   // закрытие "preloader" через setTimeout
//   closestPreloader() {
//     this.closePreloader();
//     this.closePreloaderUL();
//   }

//   // открытие "preloader"
//   openPreloader() {
//     this.refs.pageWrapper.style.display = "none";
//     this.refs.preloader.style.display = "block";
//   }

//   // закрытие "preloader"
//   closePreloader() {
//     setTimeout(() => {
//       this.refs.pageWrapper.style.display = "block";
//       this.refs.preloader.style.display = "none";
//     }, 1000);
//   }

//   // открытие "preloader" на "ul"
//   /*♥*/
//   openPreloaderUL() {
//     this.refs.filmsList.style.display = "none";
//     this.refs.preloader.style.display = "block";
//   }

//   // закрытие "preloader" на "ul"
//   /*♥*/
//   closePreloaderUL() {
//     setTimeout(() => {
//       this.refs.filmsList.style.display = "flex";
//       this.refs.preloader.style.display = "none";
//     }, 1000);
//   }
// }

// const newApp = new App();
// export default newApp;
