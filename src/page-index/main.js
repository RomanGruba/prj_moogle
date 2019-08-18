import "../scss/main.scss";
import "./page.scss";
import "../scss/header.scss";
import filmsTemplate from "./templates/template.hbs";
import { getPopularFilms } from "../js/api";

class Mooogle {
  constructor() {
    // ====================
    // Oleg
    // модальное окно "search"
    this.searchBlock = document.querySelector(".search_block");
    // кнопка вызова модального окна
    this.btnCallSearchModal = document.querySelector(".search-engine");
    // поле "input"
    this.searchInput = document.querySelector("#search_input");
    // кнопка "search"
    this.searchForm = document.querySelector('#search_form');

    // слушатель на кнопку вызова модального окна
    this.btnCallSearchModal.addEventListener(
      "click",
      this.openSearchBlockHandler.bind(this)
    );


    // обработчик поиска
    this.fnSearchingHandler = function searchingHandler(e) {
      e.preventDefault();
      console.dir(e.target);
    }
    this.clickOnSearchBtn = this.fnSearchingHandler.bind(this);

    // обработчик на клик по модалке
    this.fnClickCloseSearchBlockHandler = function clickCloseSearchBlockHandler(e) {

      if (e.target.className !== "search_modal") {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnVoid = this.fnClickCloseSearchBlockHandler.bind(this);

    // обработчик на клик по "Esc"
    this.fnKeyPressHandle = function keyPressHandle(e) {
      if (e.code !== "Escape") {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnEsc = this.fnKeyPressHandle.bind(this);
    // Oleg
    // ===============
    // Oleksii
    this.filmsList = document.querySelector(".films-list");
    this.buttonStar = document.querySelector(".button_icon-star");
    this.buttonBell = document.querySelector(".button_icon-bell");
    this.Star = document.querySelector(".icon-star");
    this.Bell = document.querySelector(".icon-bell");
    this.fill = document.querySelector(".fill-color");
    this.iconStar = document.querySelector(".icon-star");



    this.renderFilms();

    this.filmsList.addEventListener('click', event => {
      alert(event.target.nodeName)
      if(event.target !== event.currentTarget) {

        console.dir(event.target);
        localStorage.setItem('id', event.target.dataset.id);
      }


    });
    // Olecsey
  }

  // ТЕЛО КЛАССА

  // =========================
  // Oleg
  // обработчик открытия модального окна "search"
  openSearchBlockHandler() {
    window.addEventListener('keydown', this.clickOnEsc);
    window.addEventListener('click', this.clickOnVoid);

    this.searchBlock.classList.add('open_search');
    this.searchInput.focus();
    this.searchForm.addEventListener('submit', this.clickOnSearchBtn);
  }

  // обработчик закрытия модального окна "search"
  closeSearchBlockHandler() {
    this.searchBlock.classList.remove('open_search');
    this.searchInput.blur();
    this.searchForm.removeEventListener('submit', this.clickOnSearchBtn);

    window.removeEventListener('keydown', this.clickOnEsc);
    window.removeEventListener('click', this.clickOnVoid);
  }
  // Oleg
  // ================
  // Olecsey
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
  // Olecsey
  // ===============


}

const newMooogle = new Mooogle();
// ======================
// Vica

const sidebarShow = document.querySelector('.toggle-btn');
sidebarShow.addEventListener("click", show);
function show() {
  document.getElementById("sidebar").classList.toggle("active");
  document.body.classList.toggle("modal-overlay-menu");
}
// Vica
// ======================

//hidden-by-click
