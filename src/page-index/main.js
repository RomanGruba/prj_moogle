import '../scss/main.scss';
import './page.scss';
import '../scss/header.scss';


const sidebarShow = document.querySelector(".toggle-btn");
sidebarShow.addEventListener("click", show);

function show(){
  document.getElementById("sidebar").classList.toggle("active")
}
