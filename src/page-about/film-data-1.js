import {
  getSingleFilmTitle
} from '../js/api';
import {
  getSingleFilmContries
} from '../js/api';
import {
  getSingleFilmTagline
} from '../js/api';


class FilmInfo2 {
  constructor(id) {
    this.filmId = id;
    this.apy_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      filmTitle: document.querySelector('.image-mov_title'),
      filmContries: document.querySelector('[data-field="country"]'),
      filmTagline: document.querySelector('[data-field="tagline"]'),
    }
    this.renderTitle();
    this.renderContries();
    this.renderTagline();
  }

  renderTitle() {
    getSingleFilmTitle(this.filmId).then(data => {
      const titleMov = data.original_title;
      console.log(titleMov);
      this.refs.filmTitle.insertAdjacentHTML('afterbegin', titleMov);
      console.log(data);
    })
  }

  // renderContries() {
  //   getSingleFilmContries(this.filmId).then(data => {
  //     const contryMov = data.map(production_contries => getSingleFilmContries(production_contries)).join('');
  //     console.log(contryMov);
  //     this.refs.filmContries.insertAdjacentHTML('afterbegin', contryMov);
  //   })
  // }
  renderTagline() {
    getSingleFilmTagline(this.filmId).then(data => {
      const taglineMov = data.tagline;
      this.refs.filmTagline.insertAdjacentHTML('afterbegin', taglineMov);
    })
  }
}



const filmInfo = new FilmInfo2(76341)
