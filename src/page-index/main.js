import "../scss/main.scss";
import "./page.scss";
import "../scss/header.scss";
import filmsTemplate from "./templates/template.hbs";
import tvShowTemplate from "./templates/templatrTvShow.hbs";
import { getPopularFilms } from "../js/api";
import { getPopularTvShows } from "../js/api";

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
    this.searchForm = document.querySelector("#search_form");

    // слушатель на кнопку вызова модального окна
    this.btnCallSearchModal.addEventListener(
      "click",
      this.openSearchBlockHandler.bind(this)
    );

    // обработчик поиска
    this.fnSearchingHandler = function searchingHandler(e) {
      e.preventDefault();
      console.dir(e.target);
    };
    this.clickOnSearchBtn = this.fnSearchingHandler.bind(this);

    // обработчик на клик по модалке
    this.fnClickCloseSearchBlockHandler = function clickCloseSearchBlockHandler(
      e
    ) {
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
    this.buttonTvShow = document.querySelector(".menu-items-click--tv");
    this.buttonFilm = document.querySelector(".menu-items-click--film");

    this.renderFilms();

    this.buttonTvShow.addEventListener("click", event => {
      if (event.target === event.currentTarget) {
        this.clearList();
        this.renderTvShows();
        show();
      }
    });

    this.buttonFilm.addEventListener("click", event => {
      if (event.target === event.currentTarget) {
        this.clearList();
        this.renderFilms();
        show();
      }
    });
    this.filmsList.addEventListener("click", event => {
      preventDefault();
      if (event.target !== event.currentTarget) {
        localStorage.setItem("id", event.target.dataset.id);
      }
    });
    // Olecsey
  }

  // ТЕЛО КЛАССА

  // =========================
  // Oleg
  // обработчик открытия модального окна "search"
  openSearchBlockHandler() {
    window.addEventListener("keydown", this.clickOnEsc);
    window.addEventListener("click", this.clickOnVoid);

    this.searchBlock.classList.add("open_search");
    this.searchInput.focus();
    this.searchForm.addEventListener("submit", this.clickOnSearchBtn);
  }

  // обработчик закрытия модального окна "search"
  closeSearchBlockHandler() {
    this.searchBlock.classList.remove("open_search");
    this.searchInput.blur();
    this.searchForm.removeEventListener("submit", this.clickOnSearchBtn);

    window.removeEventListener("keydown", this.clickOnEsc);
    window.removeEventListener("click", this.clickOnVoid);
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

  renderTvShows() {
    getPopularTvShows().then(data => {
      const newArr = data.results.map(el => {
        el.first_air_date = new Date(el.first_air_date).getFullYear();
        return el;
      });
      const markup = tvShowTemplate(newArr);
      this.filmsList.insertAdjacentHTML("afterbegin", markup);
    });
  }

  // Oleksii==========
  clearList() {
    this.filmsList.innerHTML = "";
  }


  // Olecsey
  // ===============
}

const newMooogle = new Mooogle();
// ======================
// Vica

const sidebarShow = document.querySelector(".toggle-btn");
sidebarShow.addEventListener("click", show);
function show() {
  document.getElementById("sidebar").classList.toggle("active");
  document.body.classList.toggle("modal-overlay-menu");
}
// Vica
// ======================
