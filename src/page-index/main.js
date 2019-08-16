import '../scss/main.scss';
import './page.scss';
import '../scss/header.scss';
import filmsTemplate from './templates/template.hbs';
import { getPopularFilms } from '../js/api';

class Mooogle {
  constructor() {
    // ====================
    // Oleg
    // модальное окно "search"
    this.searchBlock = document.querySelector('.search_block');
    // кнопка "search"
    this.searchBtn = document.querySelector('.search-engine');
    // поле "input"
    this.searchInput = document.querySelector('#search_input');

    // слушатель на кнопку "search"
    this.searchBtn.addEventListener(
      'click',
      this.openSearchBlockHandler.bind(this)
    );

    // обработчик на клик по модалке "search"
    this.fnClickCloseSearchBlockHandler = function clickCloseSearchBlockHandler(
      e
    ) {
      if (e.target.className !== 'search_modal') {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnVoid = this.fnClickCloseSearchBlockHandler.bind(this);

    // обработчик на клик по "Esc"
    this.fnKeyPressHandle = function keyPressHandle(e) {
      if (e.code !== 'Escape') {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnEsc = this.fnKeyPressHandle.bind(this);
    // Oleg
    // ===============
    // Olecsey
    this.filmsList = document.querySelector('.films-list');

    this.renderFilms();
    filmsList.addEventListener('click', event => {
      localStorage.setItem('id');
    });
    // Olecsey
    // ===============
  }
  // =========================
  // Oleg
  // обработчик открытия модального окна "search"
  openSearchBlockHandler() {
    window.addEventListener('keydown', this.clickOnEsc);
    window.addEventListener('click', this.clickOnVoid);
    this.searchBlock.classList.add('open_search');
  }

  // обработчик закрытия модального окна "search"
  closeSearchBlockHandler() {
    this.searchBlock.classList.remove('open_search');
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
      this.filmsList.insertAdjacentHTML('afterbegin', markup);
    });
  }
  // Olecsey
  // ===============
}

const newMooogle = new Mooogle();
// ======================
// Vica
function show() {
  document.getElementById('sidebar').classList.toggle('active');
  document.body.classList.toggle('modal-overlay-menu');
}
// Vica
// ======================
