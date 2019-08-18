class App {
  constructor() {
    this.refs = {
      pageWrapper: document.querySelector('#page_wrapper'),
      preloader: document.querySelector('#preloader')
    };
    document.addEventListener('DOMContentLoaded', this.renderApp.bind(this));
  }

  renderApp() {
    this.closePreloader();
  }

  closePreloader() {
    setTimeout(() => {
      this.refs.pageWrapper.style.display = 'block';
      this.refs.preloader.style.display = 'none';
    }, 1000);
  }

  openPreloader() {
    this.refs.pageWrapper.style.display = 'none';
    this.refs.preloader.style.display = 'block';
  }
}

const newApp = new App();
export default newApp;
