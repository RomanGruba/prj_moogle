class App {
  constructor() {
    this.refs = {
      pageWrapper: document.querySelector('#page_wrapper'),
      preloader: document.querySelector('#preloader'),
      filmsListKill: document.querySelector('#killUL')
    };

    document.addEventListener('DOMContentLoaded', this.renderApp.bind(this));
  }

  renderApp() {
    this.closePreloader();
    this.closePreloaderUL();

  }

  openPreloader() {
    this.refs.pageWrapper.style.display = 'none';
    this.refs.preloader.style.display = 'block';
  }

  closePreloader() {
    setTimeout(() => {
      this.refs.pageWrapper.style.display = 'block';
      this.refs.preloader.style.display = 'none';
    }, 1000);
  }

  /*♥*/
  openPreloaderUL() {
    this.refs.filmsListKill.style.display = 'none';
    this.refs.preloader.style.display = 'block';
  }

  /*♥*/
  closePreloaderUL() {
    setTimeout(() => {
      this.refs.filmsListKill.style.display = 'flex';
      this.refs.preloader.style.display = 'none';
    }, 1000);
  }
}

const newApp = new App();
export default newApp;
