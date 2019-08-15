import { getSingleFilmTrailer } from "../js/api";
import { getSingleFilmActors } from "../js/api";
import { getSingleFilmFrames } from "../js/api";
import actors from "../page-about/actors.hbs";
import frames from "../page-about/frames.hbs";
import $ from "jquery";
import slick from "slick-carousel";

class FilmData {
  constructor(id) {
    this.filmId = id;
    this.api_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      iframeTrailer: document.querySelector(".iframe_trailer"),
      ulActors: document.querySelector(".actors-list"),
      ulFrames: document.querySelector(".frames-list")
    };
    this.renderTrailer();
    this.renderActors();
    this.renderFrames();
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
     
      $(".actors-list").slick({
        slidesToShow: 3,
        slidesToScroll: 1
        // autoplay: true,
        // autoplaySpeed: 2000
      });
    });
  }

  renderFrames() {
    getSingleFilmFrames(this.filmId).then(data => {
      const markup = frames(data.backdrops);
      this.refs.ulFrames.insertAdjacentHTML("afterbegin", markup);

      $(".frames-list").slick({
        slidesToShow: 3,
        slidesToScroll: 1
        // autoplay: true,
        // autoplaySpeed: 2000
      });
    });
  }
}

const filmdata = new FilmData(76341);
