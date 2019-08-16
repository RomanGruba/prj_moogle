import {
  getSingleFilmTitle
} from '../js/api';
import {
  getSingleFilmContries
} from '../js/api';
import {
  getSingleFilmTagline
} from '../js/api';
import {
  getSingleGenres
} from '../js/api';
import {
  getSingleRuntime
} from '../js/api';
import {
  getSingleOwerview
} from '../js/api';
import {
  getSinglePoster
} from '../js/api';
// import {
//   lazyLoad
// } from '../page-about/film-data';

class FilmInfo2 {
  constructor(id) {
    this.filmId = id;
    this.apy_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      filmTitle: document.querySelector('.image-mov_title'),
      filmContries: document.querySelector('[data-field="country"]'),
      filmTagline: document.querySelector('[data-field="tagline"]'),
      filmGenres: document.querySelector('[data-field="genre]'),
      filmRuntime: document.querySelector('[data-field="time"]'),
      filmOverview: document.querySelector('.movie-descr'),
      filmPoster: document.querySelector('.image-mov_section')
    }
    this.renderTitle();
    this.renderContries();
    this.renderTagline();
    // this.renderGenre();
    this.renderRuntime();
    this.renderOverview();
    this.renderPost();
  }
  renderTitle() {
    getSingleFilmTitle(this.filmId).then(data => {
      const titleMov = data.original_title;
      console.log(titleMov);
      this.refs.filmTitle.insertAdjacentHTML('afterbegin', titleMov);
      console.log(data);
    })
  }
  renderContries() {
    getSingleFilmContries(this.filmId).then(data => {
      const contryMov = data.production_contries.reduce((contries, el) => contries + el.name, 0);
      console.log(contryMov);
      // this.refs.filmContries.insertAdjacentHTML('afterbegin', contryMov);
    })
  }
  renderTagline() {
    getSingleFilmTagline(this.filmId).then(data => {
      const taglineMov = data.tagline;
      this.refs.filmTagline.insertAdjacentHTML('afterbegin', taglineMov);
    })
  }
  // renderGenre(){
  //   getSingleGenres(this.filmId).then(data => {
  //     const genresMov = data.genres;
  //     this.refs.filmGenres.insertAdjacentHTML('afterbegin', genresMov);
  //   })
  // }
  renderRuntime() {
    getSingleRuntime(this.filmId).then(data => {
      const runtimeMov = data.runtime;
      console.log(runtimeMov);
      this.refs.filmRuntime.insertAdjacentHTML('afterbegin', `${runtimeMov}мин / ${getTimeFromMins(runtimeMov)} `);

      function getTimeFromMins(runtimeMov) {
        let hours = pad(Math.trunc(runtimeMov / 60));
        let minutes = pad(runtimeMov % 60);
        return hours + ':' + minutes;

        function pad(value) {
          return String(value).padStart(2, '0');
        }
      }
    })
  }
  renderOverview() {
    getSingleOwerview(this.filmId).then(data => {
      const overviewMov = data.overview;
      this.refs.filmOverview.insertAdjacentHTML('afterbegin', overviewMov);
    })
  }
  renderPost() {
    getSinglePoster(this.filmId).then(data =>{
      const posterMov = poster(data.poster_path);
      this.refs.filmPoster.insertAdjacentHTML('afterbegin', posterMov);
      this.refs.poster.forEach(image => lazyLoad(image));
    })
  }
}




const filmInfo = new FilmInfo2(76341)
