class App {
  constructor() {
    this.pageWrapper = document.querySelector('.page_wrapper');
    document.addEventListener('DOMContentLoaded', this.renderApp.bind(this));
  }

  renderApp() {
    setTimeout(() => {
      this.pageWrapper.style.display = 'block';
    }, 1000);
  }
}

const newApp = new App();
