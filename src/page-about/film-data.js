import { getSingleFilmTrailer } from "../js/api";
import { getSingleFilmActors } from "../js/api";
import { getSingleFilmFrames } from "../js/api";
import { getSingleFeedback } from "../js/api";
import actors from "../page-about/actors.hbs";
import frames from "../page-about/frames.hbs";
import feedbacks from "../page-about/feedbacks.hbs";
import $ from "jquery";
import slick from "slick-carousel";

class FilmData {
  constructor(id) {
    this.filmId = id;
    this.api_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      iframeTrailer: document.querySelector(".iframe_trailer"),
      ulActors: document.querySelector(".actors-list"),
      ulFrames: document.querySelector(".frames-list"),
      ulFeedbacks: document.querySelector(".feedback-list"),
      actors: document.querySelectorAll(".actor_image"),
      frames: document.querySelectorAll(".frames_image"),
      largeFeedbacks: document.querySelectorAll(".largeFeedback")
    };
    // this.renderTrailer();
    // this.renderActors();
    // this.renderFrames();
    this.renderFeedbacks();
  }

  lazyLoad(targt) {
    const options = {};
    const io = new IntersectionObserver((entries, options) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const imgUrl = img.dataset.lazy;
          img.setAttribute("src", imgUrl);
          observer.disconnect();
        }
      });
    }, options);
    io.observe(target);
  }

  renderTrailer() {
    getSingleFilmTrailer(this.filmId).then(data => {
      const trailerKey = data.results[0].key;
      this.refs.iframeTrailer.src =
        "http://www.youtube.com/embed/" + trailerKey;

      if (data.results[0].key) {
        console.log("sdfsdf");
        const trailerKey = data.results[0].key;
        this.refs.iframeTrailer.src =
          "http://www.youtube.com/embed/" + trailerKey;
      } else this.refs.iframeTrailer.src = "http://www.youtube.com/embed/";
    });
  }

  renderActors() {
    getSingleFilmActors(this.filmId).then(data => {
      const markup = actors(data.credits.cast);
      this.refs.ulActors.insertAdjacentHTML("afterbegin", markup);
      this.refs.actors.forEach(image => lazyLoad(image));

      $(".actors-list").slick({
        slidesToShow: 3,
        slidesToScroll: 1
      });
    });
  }

  renderFrames() {
    getSingleFilmFrames(this.filmId).then(data => {
      const markup = frames(data.backdrops);
      this.refs.ulFrames.insertAdjacentHTML("afterbegin", markup);
      this.refs.frames.forEach(image => lazyLoad(image));

      $(".frames-list").slick({
        slidesToShow: 3,
        slidesToScroll: 1
      });
    });
  }

  renderFeedbacks() {
    getSingleFeedback(this.filmId).then(data => {
      const classifiedFeedback = [];
      data.results.map(el => {
        if (el.content.length > 380) {
          el.feedbackLength = "largeFeedback";
          classifiedFeedback.push(el);
        } else {
          el.feedbackLength = "smallFeedback";
          classifiedFeedback.push(el);
        }
      });
      const markup = feedbacks(classifiedFeedback);
      this.refs.ulFeedbacks.insertAdjacentHTML("afterbegin", markup);
      this.splitFeedback(classifiedFeedback);
    });
  }

  splitFeedback(data) {
    data.forEach(el => {
      console.log(el.content);
    });

  }
}

// const filmdata = new FilmData(448358);
// const filmdata = new FilmData(429617);
// const filmdata = new FilmData(429203);
const filmdata = new FilmData(384018);
