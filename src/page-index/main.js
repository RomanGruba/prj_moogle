import "../scss/main.scss";
import "./page.scss";
import "../scss/header.scss";
import filmsTemplate from "./templates/template.hbs";
import { getPopularFilms } from "../js/api";


const sidebarShow = document.querySelector(".toggle-btn");
sidebarShow.addEventListener("click", show);

function show() {
  document.getElementById("sidebar").classList.toggle("active");
}

class Mooogle {
  constructor() {
    this.filmsList = document.querySelector(".films-list");

    // this.renderFilms();
    // filmsList.addEventListener('click',  event => {
    //       localStorage.setItem("id", );
    //     })
  }

  renderFilms() {
    getPopularFilms().then(data => {
      const newArr = data.results.map(el => {
        el.release_date = new Date(el.release_date).getFullYear();
        return el;
      });
      const markup = filmsTemplate(newArr);
      this.filmsList.insertAdjacentHTML("afterbegin", markup);
    });
  }
}

new Mooogle();


