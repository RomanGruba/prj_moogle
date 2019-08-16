import {
  getSingleFilmTitle,
  getSingleFilm,
  getSingleFilmContries,
  getSingleFilmTagline,
  getSingleGenres,
  getSingleRuntime,
  getSingleOwerview,
  getSinglePoster,
  getSinglePosterLittle
} from '../js/api';


class FilmInfo2 {
  constructor(id) {
    this.filmId = id;
    this.apy_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      filmTitle: document.querySelector('.image-mov_title'),
      filmContries: document.querySelector('[data-field="country"]'),
      filmTagline: document.querySelector('[data-field="tagline"]'),
      filmGenres: document.querySelector('[data-field="genre"]'),
      filmRuntime: document.querySelector('[data-field="time"]'),
      filmOverview: document.querySelector('.movie-descr'),
      filmPoster1: document.querySelector('.image-mov1'),
     filmPoster2: document.querySelector('.image-mov2')
    }

    this.renderAll()
  }

  renderAll() {
    getSingleFilm(this.filmId).then(data => {
      console.log('single data:', data);
      this.renderTitle(data);
      this.renderContries(data);
      this.renderTagline(data);
      this.renderGenre(data);
      this.renderRuntime(data);
      this.renderOverview(data);
      this.renderPost1(data);
      this.renderPost2(data);
    })
  }

  renderTitle(data) {
    const titleMov = data.original_title;
    console.log(titleMov);
    this.refs.filmTitle.insertAdjacentHTML('afterbegin', titleMov);
    console.log(data);
  }
  renderContries(data) {
    const contryMov = data.production_countries.reduce((contries, el, indx) => {
      if (indx > 0) {
        return contries + ', ' + el.name
      }
      return contries + el.name
    }, '');
    this.refs.filmContries.textContent = contryMov;
    console.log('contryMov', contryMov);
  }
  renderTagline(data) {
    const taglineMov = data.tagline;
    this.refs.filmTagline.insertAdjacentHTML('afterbegin', taglineMov);

  }

  renderGenre(data) {
    const genreMov = data.genres.reduce((g, el, indx) => {
      if (indx > 0) {
        return g + ', ' + el.name
      }
      return g + el.name
    }, '');
    console.log(genreMov);
    this.refs.filmGenres.textContent = genreMov;

  }
  renderRuntime(data) {
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
  }
  renderOverview(data) {
      const overviewMov = data.overview;
      this.refs.filmOverview.insertAdjacentHTML('afterbegin', overviewMov);

  }
  renderPost1(data) {
    const posterMov = data.backdrop_path;
    console.log(`https://image.tmdb.org/t/p/original${posterMov}`);
    console.log(this.refs.filmPoster);
    this.refs.filmPoster1.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${posterMov}")`;
  }
  renderPost2(data) {
    const posterMov2 = data.poster_path;
    console.log(`https://image.tmdb.org/t/p/original${posterMov2}`);
    console.log(this.refs.filmPoster);
    this.refs.filmPoster2.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${posterMov2}")`;
  }

}




const filmInfo = new FilmInfo2(localStorage.getItem('id'))
