import '../scss/main.scss';
import './page.scss';
import '../scss/header.scss';

class Mooogle {
  constructor() {
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
  }

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
}

const newMooogle = new Mooogle();
