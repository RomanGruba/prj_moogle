import '../scss/main.scss';
import './page.scss';
import list from './list.hbs';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-about');
  document.body.insertAdjacentHTML('beforeend', list());
});
