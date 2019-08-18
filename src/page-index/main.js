import '../scss/main.scss';
import './page.scss';
import '../scss/header.scss';
import filmsTemplate from './templates/template.hbs';
import api from '../js/api.js';
import newApp from '../js/app.js';

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
    this.searchingHandler = function (e) {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.elements.query;
      api.searchQuery = input.value;
      newApp.openPreloader();
      api.resetPage();
      this.refs.filmsList.innerHTML = '';
      api
        .getSearching()
        .then(data => {
          this.newArrayResults(data);
          this.builderListItemOnPageIndex();
          this.infinityScroll();
        })
        .catch(error => {
          console.warn(error);
        });
      this.closeSearchBlockHandler();
      input.value = '';
      newApp.closePreloader();
    };
    this.clickOnSearchBtn = this.searchingHandler.bind(this);

    // бесконечный скролл
    this.infScrl = function () {

      const observOptions = {
        rootMargin: '100px'
      };
      const observer = new IntersectionObserver(this.onEntry, observOptions);
      observer.observe(this.refs.sentinal);
    };
    this.infinityScroll = this.infScrl.bind(this);
    // ===
    this.onEnt = function (e) {
      if (e[0].isIntersecting) {
        this.builderListItemOnPageIndex();
        observer.disconnect();
      }
    }
    this.onEntry = this.onEnt.bind(this);

    // Получение массива результатов для строителя
    this.newArrRes = function (objData) {
      this.newArrRes = objData.results.map(el => {
        el.release_date = new Date(el.release_date).getFullYear();
        return el;
      })
    };
    this.newArrayResults = this.newArrRes.bind(this);

    // строитель списка фильмов на "page-index"
    this.insertListItem = function () {
      const markup = filmsTemplate(this.newArrRes);
      this.refs.filmsList.insertAdjacentHTML('beforeend', markup);
      api.increment();
    };
    this.builderListItemOnPageIndex = this.insertListItem.bind(this);

    // обработчик на клик по модалке
    this.clickCloseSearchBlockHandler = function (
      e
    ) {
      if (e.target.className !== 'search_modal') {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnVoid = this.clickCloseSearchBlockHandler.bind(this);

    // обработчик на клик по "Esc"
    this.keyPressHandle = function (e) {
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

    this.renderFilms();

    this.refs.filmsList.addEventListener('click', event => {
      // alert(event.target.nodeName);
      if (event.target !== event.currentTarget) {
        // console.dir(event.target);
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
  // Oleg
  // ================
  // Olecsey
  renderFilms() {
    api.getPopularFilms().then(data => {
      this.newArrayResults(data);
      this.builderListItemOnPageIndex();
      this.infinityScroll();
    });
  }
  // Olecsey
  // ===============
}

const newMooogle = new Mooogle();
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
