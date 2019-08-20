import '../scss/main.scss';
import './page.scss';
import '../scss/header.scss';
import filmsTemplate from './templates/template.hbs';
import api from '../js/api.js';
import newApp from '../js/app.js';
import { getPopularTvShows } from '../js/api';

class Mooogle {
  constructor() {
    // привязки к HTML
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
      filmsList: document.querySelector('.films-list'),

      // кнопка "scroll up"
      scrollUpBtn: document.querySelector('#scroll_up'),
      buttonTvShow: document.querySelector('.menu-items-click--tv'),
      buttonFilm: document.querySelector('.menu-items-click--film'),
      headerButtonFilm: document.querySelector('.header-items-click--film'),
      headerButtonTvShow: document.querySelector('.header-items-click--tv'),
      buttonIconStar: document.querySelector('.button_icon-star'),
      iconStar: document.querySelector('.icon-star')

    };

    // при загрузке страницы рендерит популярные фильмы
    this.renderPopularFilms();


    // слушатель на кнопку вызова модального окна
    this.refs.btnCallSearchModal.addEventListener(
      'click',
      this.openSearchBlockHandler.bind(this)
    );

    // слушатель на кнопке "scroll up"
    this.refs.scrollUpBtn.addEventListener(
      'click',
      this.scrollToUpHandler.bind(this)
    );

    // слушатель на
    this.refs.buttonTvShow.addEventListener('click', event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloader();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.renderTvShows();
        localStorage.setItem('mediaType', 'TV');
        show();
        newApp.closePreloader();
      }
    });

    // слушатель на
    this.refs.headerButtonTvShow.addEventListener('click', event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloader();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.renderTvShows();
        localStorage.setItem('mediaType', 'TV');
        newApp.closePreloader();
      }
    });

    // слушатель на
    this.refs.buttonFilm.addEventListener('click', event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloader();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.renderPopularFilms();
        localStorage.setItem('mediaType', 'movie');
        show();
        newApp.closePreloader();
      }
    });

    // слушатель на
    this.refs.headerButtonFilm.addEventListener('click', event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloader();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.renderPopularFilms();
        localStorage.setItem('mediaType', 'movie');
        newApp.closePreloader();
      }
    });

    // слушатель на
    this.refs.filmsList.addEventListener('click', event => {
      preventDefault();
      if (event.target !== event.currentTarget) {
        console.log(event.target.dataset.id);
        localStorage.setItem('id', event.target.dataset.id);

        localStorage.setItem('mediaType', 'movie');
      }
    });


    // слушатель на
    this.refs.buttonIconStar.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        localStorage.setItem("status", "favorite");
        this.iconStar.style.cssText = "fill: gold";
      }
    });

    // обработчик поиска
    this.searchingHandler = function(e) {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.elements.query;
      api.searchQuery = input.value;
      newApp.openPreloader();
      api.resetPage();
      this.clearList();
      this.killInfinityScroll();
      this.renderSearchingFilm();
      this.closeSearchBlockHandler();
      input.value = '';
      newApp.closePreloader();
    };

    this.clickOnSearchBtn = this.searchingHandler.bind(this);

    // скролл button up
    setTimeout(() => {
      this.onEnBtnUp = function(e) {
        if (e[0].isIntersecting) {
          this.refs.scrollUpBtn.classList.toggle('is-hidden');
        }
      };
      this.onEntryBtnUp = this.onEnBtnUp.bind(this);
      this.scrlToUp = function() {
        this.observOptionsBtnUp = {
          rootMargin: '400px 0px -1100px 0px'
        };
        this.observerBtnUp = new IntersectionObserver(
          this.onEntryBtnUp,
          this.observOptionsBtnUp
        );
        this.observerBtnUp.observe(this.refs.filmsList.firstElementChild);
      };
      this.scrollToUp = this.scrlToUp.bind(this);
      this.scrollToUp();
    }, 2000);

    // бесконечный скролл
    this.onEntInfScr = function(e) {
      if (e[0].isIntersecting) {
        if (api.query === '') {
          this.renderPopularFilms();
        } else {
          this.renderSearchingFilm();
        }
        this.killInfinityScroll();
      }
    };
    this.onEntryByInfScrl = this.onEntInfScr.bind(this);
    this.infScrl = function() {
      this.observOptionsInfScrl = {
        rootMargin: '100px'
      };
      this.observerInfScrl = new IntersectionObserver(
        this.onEntryByInfScrl,
        this.observOptionsInfScrl
      );
      this.observerInfScrl.observe(this.refs.sentinal);
    };
    this.infinityScroll = this.infScrl.bind(this);
    this.killer = function() {
      this.observerInfScrl.disconnect();
    };
    this.killInfinityScroll = this.killer.bind(this);

    // строитель списка фильмов на "page-index"
    this.insertListItem = function(objData) {
      this.newArrRes = objData.results.map(el => {
        el.release_date = new Date(el.release_date).getFullYear();
        return el;
      });
      const markup = filmsTemplate(this.newArrRes);
      this.refs.filmsList.insertAdjacentHTML('beforeend', markup);
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
  }

  // ТЕЛО КЛАССА

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
    this.refs.searchForm.removeEventListener('submit', this.clickOnSearchBtn);

    window.removeEventListener('keydown', this.clickOnEsc);
    window.removeEventListener('click', this.clickOnVoid);
  }

  // Рендеринг найденых фильмов
  renderSearchingFilm() {
    api
      .getSearching()
      .then(data => {
        if (data.total_pages < api.page) {
          this.killInfinityScroll();
          return;
        }
        this.builderListItemOnPageIndex(data);
        this.infinityScroll();
      })
      .catch(error => {
        console.warn(error);
      });
  }

  // Рендеринг популярных фильмов
  renderPopularFilms() {
    api
      .getPopularFilms()
      .then(data => {
        if (data.total_pages < api.page) {
          this.killInfinityScroll();
          return;
        }
        this.builderListItemOnPageIndex(data);
        this.infinityScroll();
      })
      .catch(error => console.warn(error));
  }

  // Рендеринг TV сериалов
  renderTvShows() {
    getPopularTvShows()
      .then(data => {
        if (data.total_pages < api.page) {
          this.killInfinityScroll();
          return;
        }
        this.builderListItemOnPageIndex(data);
        this.infinityScroll();
      })
      .catch(error => console.warn(error));
  }

  // очистка HTML
  clearList() {
    this.refs.filmsList.innerHTML = '';
  }

  // обработчик на кнопку "scroll up"
  scrollToUpHandler() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

new Mooogle();
// ======================

// Vica

const sidebarShow = document.querySelector('.toggle-btn');
sidebarShow.addEventListener('click', show);
function show() {
  document.getElementById('sidebar').classList.toggle('active');
  document.body.classList.toggle('modal-overlay-menu');
}
// Vica
// ======================
