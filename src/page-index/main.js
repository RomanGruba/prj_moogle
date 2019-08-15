import '../scss/main.scss';
import './page.scss';
// import './input.js';
// import list from './list.hbs';

// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded', 'page-about');
//   document.body.insertAdjacentHTML('beforeend', list());
// });
import '../scss/header.scss';


const sidebarShow = document.querySelector(".toggle-btn");
sidebarShow.addEventListener("click", show);

function show(){
  document.getElementById("sidebar").classList.toggle("active")
}
