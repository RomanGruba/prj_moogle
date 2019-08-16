import { getSingleFilmTrailer } from "../js/api";
import { getSingleFilmActors } from "../js/api";
import actors from "../page-about/actors.hbs";

class FilmData {
  constructor(id) {
    this.filmId = id;
    this.api_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      iframeTrailer: document.querySelector(".iframe_trailer"),
      ulActors: document.querySelector(".actors-list")
    };
    this.renderActors();
  }

  renderTrailer() {
    getSingleFilmTrailer(this.filmId).then(data => {
      const trailerKey = data.results[0].key;
      this.refs.iframeTrailer.src =
        "http://www.youtube.com/embed/" + trailerKey;
    });
  }

  renderActors() {
    getSingleFilmActors(this.filmId).then(data => {
      const markup = actors(data.credits.cast);
      this.refs.ulActors.insertAdjacentHTML("afterbegin", markup);
    });
  }
}

const filmdata = new FilmData(76341);
