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
  constructor(id, mediaType) {
    this.filmId = id;
    this.mediaType = mediaType;
    this.api_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      // коробка для "preloader"
      pageWrapper: document.querySelector("#page_wrapper"),
      // "preloader"
      preloader: document.querySelector("#preloader"),
      iframeTrailer: document.querySelector(".iframe_trailer"),
      ulActors: document.querySelector(".actors-list"),
      ulFrames: document.querySelector(".frames-list"),
      ulFeedbacks: document.querySelector(".feedback-list"),
      actors: document.querySelectorAll(".actor_image"),
      frames: document.querySelectorAll(".frames_image"),
      feedbackSection: document.querySelector(".feedback"),
      trailer: document.querySelector(".trailer")
    };
    this.defineMovieOrTv();
    // слушатель на DOM для "preloader"
    document.getElementById('search_engine_btn').style.display = "none";
    document.addEventListener(
      "DOMContentLoaded",
      this.closePreloader.bind(this)
    );

  }

  // закрытие "preloader"
  closePreloader() {
    setTimeout(() => {
      this.refs.pageWrapper.style.display = "block";
      this.refs.preloader.style.display = "none";
    }, 1000);
  }

  defineMovieOrTv() {
    this.renderTrailer();
    this.renderActors();
    this.renderFrames();
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
    getSingleFilmTrailer(this.filmId, this.mediaType).then(data => {
      if (data.results.length > 0) {
        this.refs.trailer.classList.remove("hidden_text");
        const trailerKey = data.results[0].key;
        this.refs.iframeTrailer.src =
          "http://www.youtube.com/embed/" + trailerKey;
      } else this.refs.trailer.classList.add("hidden_text");
    });
  }

  renderActors() {
    getSingleFilmActors(this.filmId, this.mediaType).then(data => {
      const markup = actors(data.credits.cast);
      this.refs.ulActors.insertAdjacentHTML("afterbegin", markup);
      this.refs.actors.forEach(image => lazyLoad(image));

      setTimeout(() =>
        $(".actors-list").slick({
          slidesToShow: 3,
          slidesToScroll: 1
        })
      , 1000)
    });
  }

  renderFrames() {
    getSingleFilmFrames(this.filmId, this.mediaType).then(data => {
      const markup = frames(data.backdrops);
      this.refs.ulFrames.insertAdjacentHTML("afterbegin", markup);
      this.refs.frames.forEach(image => lazyLoad(image));
      setTimeout(() =>
        $(".frames-list").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1500,
        })
      , 1000)
    });
  }

  renderFeedbacks() {
    getSingleFeedback(this.filmId, this.mediaType).then(data => {
      if (data.results.length > 0) {
        const classifiedFeedback = [];
        data.results.map(el => {
          if (el.content.length > 380) {
            el.feedbackLength = "largeFeedback";
            el.smallText = el.content.substr(0, 380);
            el.extendedText = el.content.substr(380);
            classifiedFeedback.push(el);
          } else {
            el.smallText = el.content;
            classifiedFeedback.push(el);
          }
        });
        const markup = feedbacks(classifiedFeedback);
        this.refs.ulFeedbacks.insertAdjacentHTML("afterbegin", markup);
        this.showMoreFeedbackText();
      } else this.refs.feedbackSection.classList.add("hidden_text");
    });
  }

  showMoreFeedbackText() {
    this.refs.ulFeedbacks.addEventListener("click", e => {
      if (
        e.target.nodeName === "BUTTON" &&
        e.target.textContent === "...more"
      ) {
        const hiddenSpan = e.target.previousSibling;
        hiddenSpan.classList.add("show_text");
        e.target.textContent = "...less";
      } else if (
        e.target.nodeName === "BUTTON" &&
        e.target.textContent === "...less"
      ) {
        const hiddenSpan = e.target.previousSibling;
        hiddenSpan.classList.remove("show_text");
        e.target.textContent = "...more";
      }
    });
  }
}

const filmdata = new FilmData(
  localStorage.getItem("id"),
  localStorage.getItem("mediaType")
);

// const filmdata = new FilmData(429203);
// const filmdata = new FilmData(384018);
// const filmdata = new FilmData(363088, 'movie');
// const filmdata = new FilmData(448358);
