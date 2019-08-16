import {
  getSingleFilmTitle,
  getSingleFilm,
  getSingleFilmContries,
  getSingleFilmTagline,
  getSingleGenres,
  getSingleRuntime,
  getSingleOwerview,
  getSinglePoster
} from '../js/api';

import {
  lazyLoad
} from '../page-about/film-data';

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
      filmPoster: document.querySelector('.image-mov')
    }
    this.renderAll()
  }

  renderAll() {
    getSingleFilm(this.filmId).then(data => {
      console.log('single data:', data);
      this.renderTitle(data);
      this.renderContries(data);
      // this.renderTagline(data);
      // this.renderGenre();
      // this.renderRuntime(data);
      // this.renderOverview(data);
      this.renderPost(data);
    })
  }

  renderTitle(data) {
    const titleMov = data.original_title;
    console.log(titleMov);
    this.refs.filmTitle.insertAdjacentHTML('afterbegin', titleMov);
    console.log(data);
  }
  renderContries(data) {
    // getSingleFilmContries(this.filmId).then(data => {
      // })
      const contryMov = data.production_countries.reduce((contries, el, indx) => {
        if(indx > 0) {

          return  contries + ', ' + el.name
        }
        return  contries + el.name
      }, '');
    this.refs.filmContries.textContent = contryMov;
    console.log('contryMov', contryMov);
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
      console.log(data.person);
    })
  }
  renderPost(data) {
    // getSinglePoster(this.filmId).then(data =>{
    // })
    const posterMov = data.backdrop_path;
    console.log(`https://image.tmdb.org/t/p/original${posterMov}`);
    console.log(this.refs.filmPoster);
    this.refs.filmPoster.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${posterMov}")`;
    // this.refs.poster.forEach(image => lazyLoad(image));
  }
}




const filmInfo = new FilmInfo2(76341)
