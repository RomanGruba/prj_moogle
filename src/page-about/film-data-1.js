import {
  getSingleFilmTitle,
  getSingleFilm,
  getSingleFilmContries,
  getSingleFilmTagline,
  getSingleGenres,
  getSingleRuntime,
  getSingleOwerview,
  getSinglePoster,
  getSinglePosterLittle,
  getSingleDirector,
  getSingleDataRealise,
  getSingleScreenPlay
} from '../js/api';



class FilmInfo2 {
  constructor(id, mediaType) {
    this.filmId = id;
    this.mediaType = mediaType;
    this.apy_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      filmTitle: document.querySelector('.image-mov_title'),
      filmContries: document.querySelector('[data-field="country"]'),
      filmTagline: document.querySelector('[data-field="tagline"]'),
      filmGenres: document.querySelector('[data-field="genre"]'),
      filmRuntime: document.querySelector('[data-field="time"]'),
      filmOverview: document.querySelector('.movie-descr'),
      filmPoster1: document.querySelector('.image-mov1'),
      filmPoster2: document.querySelector('.image-mov2'),
      filmDirector: document.querySelector('[data-field="director"]'),
      filmRealiseFull: document.querySelector('.data-down'),
      fimlScreenPlay: document.querySelector('[data-field="scenario"]')
    }

    this.renderAll()
  }

  renderAll() {
    getSingleFilm(this.filmId, this.mediaType).then(data => {
      this.renderTitle();
      this.renderContries();
      this.renderTagline(data);
      this.renderGenre(data);
      this.renderRuntime(data);
      this.renderOverview(data);
      this.renderPost1(data);
      this.renderPost2(data);
      this.renderDirector(data);
      this.renderRealiseFull(data);
      this.renderScreenPlay(data);
    })
  }
  renderTitle() {
    getSingleFilmTitle(this.filmId, this.mediaType).then(data => {
      const title = data.original_name || data.original_title;
      this.refs.filmTitle.insertAdjacentHTML('afterbegin', title);
    })
  }
  renderContries() {
    getSingleFilmContries(this.filmId, this.mediaType).then(data => {
      const contryMov = data.production_countries && data.production_countries.reduce((contries, el, indx) => {
        if (indx > 0) {
          return contries + ', ' + el.name
        }
        return contries + el.name
      }, '') || data.origin_country[0];
      this.refs.filmContries.textContent = contryMov;
    })
  }
  renderTagline() {
    getSingleFilmTagline(this.filmId, this.mediaType).then(data => {
    const taglineMov = data.tagline || data.vote_average;
    console.log(taglineMov);
    this.refs.filmTagline.textContent = taglineMov;
  })
}

  renderGenre() {
    getSingleGenres(this.filmId, this.mediaType).then(data => {
      const genreMov = data.genres.reduce((g, el, indx) => {
        if (indx > 0) {
          return g + ', ' + el.name
        }
        return g + el.name
      }, '');
      this.refs.filmGenres.textContent = genreMov;
      console.log(data);
    })
  }
  renderRuntime(data) {
    const runtimeMov = data.runtime;
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
    this.refs.filmPoster1.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${posterMov}")`;
  }
  renderPost2() {
    getSinglePoster(this.filmId, this.mediaType).then(data => {
    const posterMov2 = data.poster_path;
    this.refs.filmPoster2.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${posterMov2}")`;
  })
}
  renderDirector() {
    getSingleDirector(this.filmId, this.mediaType).then(data => {
    const direct = data.credits && data.credits.crew.find(crew => crew.job === "Director").name || data.created_by.reduce((creater, el, indx) => {
      if (indx > 0) {
        return creater + ', ' + el.name
      }
      return creater + el.name
    }, '');
this.refs.filmDirector.textContent = direct;
  })
}
  renderRealiseFull(data) {
    const realiseFullData = data.release_date;
    this.refs.filmRealiseFull.textContent = realiseFullData;
  }
  renderScreenPlay() {
    getSingleScreenPlay(this.filmId, this.mediaType).then(data => {
    const screenPlaeer = data.credits && data.credits.crew.find(crew => crew.job === "Screenplay").name || checkProduct(data.in_production);
    function checkProduct() {
      if (data.in_production == true){
        return "In production";
      } else {
        return "Finish";
      }
    }
    this.refs.fimlScreenPlay.textContent = screenPlaeer;
  })
}
}

const filmdata = new FilmInfo2(1622, 'TV');
// const filmInfo = new FilmInfo2(122, 'movie');
