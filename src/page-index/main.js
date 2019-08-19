import '../scss/main.scss';
import './page.scss';
import '../scss/header.scss';
import filmsTemplate from './templates/template.hbs';
import api from '../js/api.js';
import newApp from '../js/app.js';
import tvShowTemplate from "./templates/templatrTvShow.hbs";
import { getPopularTvShows } from "../js/api";


class Mooogle {
  constructor() {
    // ====================
    // Oleg
    this.refs = {
      // модальное окно "search"
      searchBlock: document.querySelector('.search_block'),
      // кнопка вызова модального окна
      btnCallSearchModal: document.querySelector('.search-engine'),
      // поле "input"
      searchInput: document.querySelector('#search_input'),
      // кнопка "search"
      searchForm: document.querySelector('#search_form'),
      // страж для скрола
      sentinal: document.querySelector('#sentinal'),
      // список "ul" в "grid"
      filmsList: document.querySelector('.films-list')
    };

    // слушатель на кнопку вызова модального окна
    this.refs.btnCallSearchModal.addEventListener(
      'click',
      this.openSearchBlockHandler.bind(this)
    );

    // обработчик поиска
    this.searchingHandler = function(e) {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.elements.query;
      api.searchQuery = input.value;
      newApp.openPreloader();
      api.resetPage();
      this.refs.filmsList.innerHTML = '';
      this.renderSearchingFilm();
      // this.infinityScrollSearching();
      this.closeSearchBlockHandler();
      input.value = '';
      newApp.closePreloader();
    };
    this.clickOnSearchBtn = this.searchingHandler.bind(this);

    // бесконечный скролл
    this.onEnt = function(e) {
      // let flag = false;
      if (e[0].isIntersecting) {
        // if (flag) {
        //   return;
        // }
        if (api.query === '') {
          this.renderPopularFilms();
          console.log('popular');
        } else {
          this.renderSearchingFilm();
          console.log('search');
        }
        // flag = true;
        this.observer.disconnect();
      }
    };

    this.onEntry = this.onEnt.bind(this);

    this.infScrl = function() {
      const observOptions = {
        rootMargin: '100px'
      };
      this.observer = new IntersectionObserver(this.onEntry, observOptions);
      this.observer.observe(this.refs.sentinal);
    };
    this.infinityScroll = this.infScrl.bind(this);

    // строитель списка фильмов на "page-index"
    this.insertListItem = function(objData) {
      this.newArrRes = objData.results.map(el => {
        el.release_date = new Date(el.release_date).getFullYear();
        return el;
      });
      const markup = filmsTemplate(this.newArrRes);
      this.refs.filmsList.insertAdjacentHTML('beforeend', markup);
      console.log('api.page :', api.page);
      api.increment();
    };
    this.builderListItemOnPageIndex = this.insertListItem.bind(this);

    // обработчик на клик по модалке
    this.clickCloseSearchBlockHandler = function(e) {
      if (e.target.className !== 'search_modal') {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnVoid = this.clickCloseSearchBlockHandler.bind(this);

    // обработчик на клик по "Esc"
    this.keyPressHandle = function(e) {
      if (e.code !== 'Escape') {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnEsc = this.keyPressHandle.bind(this);
    // Oleg
    // ===============
    // Oleksii
    this.buttonStar = document.querySelector('.button_icon-star');
    this.buttonBell = document.querySelector('.button_icon-bell');
    this.Star = document.querySelector('.icon-star');
    this.Bell = document.querySelector('.icon-bell');
    this.fill = document.querySelector('.fill-color');
    this.iconStar = document.querySelector('.icon-star');
    this.filmsList = document.querySelector(".films-list");
    this.buttonTvShow = document.querySelector(".menu-items-click--tv");
    this.buttonFilm = document.querySelector(".menu-items-click--film");

    this.renderPopularFilms();

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
    window.addEventListener('keydown', this.clickOnEsc);
    window.addEventListener('click', this.clickOnVoid);

    this.refs.searchBlock.classList.add('open_search');
    this.refs.searchInput.focus();
    this.refs.searchForm.addEventListener('submit', this.clickOnSearchBtn);
  }

  // обработчик закрытия модального окна "search"
  closeSearchBlockHandler() {
    this.refs.searchBlock.classList.remove('open_search');
    this.searchInput.blur();
    this.refs.searchForm.removeEventListener('submit', this.clickOnSearchBtn);

    window.removeEventListener("keydown", this.clickOnEsc);
    window.removeEventListener("click", this.clickOnVoid);
  }

  // Рендеринг найденых фильмов
  renderSearchingFilm() {
    api
      .getSearching()
      .then(data => {
        this.builderListItemOnPageIndex(data);
        this.infinityScroll();
      })
      .catch(error => {
        console.warn(error);
      });
  }

  // Oleg
  // ================
  // Olecsey
  // Рендеринг популярных фильмов
  renderPopularFilms() {
    api
      .getPopularFilms()
      .then(data => {
        this.builderListItemOnPageIndex(data);
        this.infinityScroll();
      })
      .catch(error => console.warn(error));
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
  document.getElementById('sidebar').classList.toggle('active');
  document.body.classList.toggle('modal-overlay-menu');
}
// Vica
// ======================
