import "../scss/main.scss";
import "./page.scss";
import "../scss/header.scss";
import filmsTemplate from "./templates/template.hbs";
import api from "../js/api.js";
import newApp from "../js/app.js";

class Mooogle {
  constructor() {
    // привязки к HTML
    this.refs = {
      // модальное окно "search"
      searchBlock: document.querySelector(".search_block"),
      // кнопка вызова модального окна
      btnCallSearchModal: document.querySelector(".search-engine"),
      // поле "input"
      searchInput: document.querySelector("#search_input"),
      // кнопка "search"
      searchForm: document.querySelector("#search_form"),
      // страж для скрола
      sentinal: document.querySelector("#sentinal"),
      // список "ul" в "grid"
      filmsList: document.querySelector(".films-list"),
      // кнопка "scroll up"
      scrollUpBtn: document.querySelector("#scroll_up"),
      // кнопка "btn sort by name"
      btnSortName: document.querySelector("#btn_sort_by_name"),
      // paragraf "film name"
      filmName: document.querySelector("#film_name"),
      // кнопка "btn sort by date"
      btnSortDate: document.querySelector("#btn_sort_by_date"),
      // span "film date"
      filmDate: document.querySelectorAll("#film_date"),

      buttonTvShow: document.querySelector(".menu-items-click--tv"),
      buttonFilm: document.querySelector(".menu-items-click--film"),
      headerButtonFilm: document.querySelector(".header-items-click--film"),
      headerButtonTvShow: document.querySelector(".header-items-click--tv"),
      buttonIconStar: document.querySelector(".button_icon-star"),
      iconStar: document.querySelector(".icon-star"),

      // toggle-btn + Sidebar
      buttonShowSidebar: document.querySelector(".toggle-btn"),
      sidebarItem: document.querySelector(".sidebar"),
      menuList: document.getElementById("menu-list")
    };

    // при загрузке страницы рендерит популярные фильмы
    this.renderPopularFilms().then(() => this.scrollToUp());

    // слушатель на кнопку вызова модального окна
    this.refs.btnCallSearchModal.addEventListener(
      "click",
      this.openSearchBlockHandler.bind(this)
    );

    // слушатель на кнопке "scroll up"
    this.refs.scrollUpBtn.addEventListener(
      "click",
      this.scrollToUpHandler.bind(this)
    );

    // // слушатель на кнопке "btn sort by name"
    // this.refs.btnSortName.addEventListener(
    //   "click",
    //   this.clickOnBtnName.bind(this)
    // );

    // слушатель на кнопке "btn sort by date"
    this.refs.btnSortDate.addEventListener(
      "click",
      this.clickOnBtnDate.bind(this)
    );

    //listener mobile Oleksii
    this.refs.buttonTvShow.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloader();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.sortArray = [];
        this.renderTvShows().then(() => this.scrollToUp());
        show();
        newApp.closePreloader();
      }
    });

    //listener desktop Oleksii
    this.refs.headerButtonTvShow.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloader();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.sortArray = [];
        this.renderTvShows().then(() => this.scrollToUp());
        newApp.closePreloader();
      }
    });

    //listener mobile Oleksii
    this.refs.buttonFilm.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloader();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.sortArray = [];
        this.renderPopularFilms().then(() => this.scrollToUp());
        show();
        newApp.closePreloader();
      }
    });

    //listener desktop Oleksii
    this.refs.headerButtonFilm.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloader();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.sortArray = [];
        this.renderPopularFilms().then(() => this.scrollToUp());
        newApp.closePreloader();
      }
    });

    // слушатель на click on image and star
    this.refs.filmsList.addEventListener("click", event => {
      console.log("event.target.nodeName :", event.target.nodeName);
      if (event.target !== event.currentTarget) {
        localStorage.setItem(
          "id",
          event.target.closest(".films-item").dataset.id
        );
        localStorage.setItem(
          "mediaType",
          event.target.closest(".films-item").dataset.mediatype
        );

        if (
          event.target.nodeName === "SVG" ||
          event.target.nodeName === "use"
        ) {
          // console.log(event.target.nodeName);
        }
      }
    });

    // sidebar showup Vika
    this.show = function() {
      this.refs.menuList.classList.add("active");
      document.body.classList.add("modal-overlay-menu");
      // this.refs.sidebarItem.classList.toggle('active');
    };
    this.showSidebar = this.show.bind(this);

    this.showDont = function() {
      this.refs.menuList.classList.remove("active");
      document.body.classList.remove("modal-overlay-menu");
      // this.refs.sidebarItem.classList.toggle('active');
    };
    this.showDontSidebar = this.showDont.bind(this);

    this.refs.buttonShowSidebar.addEventListener("click", this.showSidebar);
    // end of sidebar showUp

    // обработчик поиска
    this.searchingHandler = function(e) {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.elements.query;
      api.searchQuery = input.value;
      newApp.openPreloader();
      api.resetPage();
      this.clearList();
      this.killInfinityScroll();
      this.sortArray = [];
      this.renderSearchingFilm().then(() => this.scrollToUp());
      this.closeSearchBlockHandler();
      input.value = "";
      newApp.closePreloader();
    };
    this.clickOnSearchBtn = this.searchingHandler.bind(this);

    // скролл button up
    this.onEnBtnUp = function(e) {
      if (e[0].isIntersecting) {
        this.refs.scrollUpBtn.classList.toggle("is-hidden");
      }
    };
    this.onEntryBtnUp = this.onEnBtnUp.bind(this);
    this.scrlToUp = function() {
      this.observOptionsBtnUp = {
        rootMargin: "0px",
        threshold: 1
      };
      this.observerBtnUp = new IntersectionObserver(
        this.onEntryBtnUp,
        this.observOptionsBtnUp
      );
      this.observerBtnUp.observe(this.refs.filmsList.children[6]);
    };
    this.scrollToUp = this.scrlToUp.bind(this);

    // бесконечный скролл
    this.onEntInfScr = function(e) {
      if (e[0].isIntersecting) {
        if (api.query === "") {
          if (localStorage.getItem("mediaType") === "movie") {
            console.log(localStorage.getItem("mediaType"));
            this.renderPopularFilms().then(() => this.scrollToUp());
          } else if (localStorage.getItem("mediaType") === "TV") {
            console.log(localStorage.getItem("mediaType"));
            this.renderTvShows().then(() => this.scrollToUp());
          }
        } else {
          this.renderSearchingFilm().then(() => this.scrollToUp());
        }
        this.killInfinityScroll();
      }
    };
    this.onEntryByInfScrl = this.onEntInfScr.bind(this);
    this.infScrl = function() {
      this.observOptionsInfScrl = {
        rootMargin: "100px"
      };
      this.observerInfScrl = new IntersectionObserver(
        this.onEntryByInfScrl,
        this.observOptionsInfScrl
      );
      this.observerInfScrl.observe(this.refs.sentinal);
    };
    this.infinityScroll = this.infScrl.bind(this);
    this.killer = function() {
      this.observerInfScrl.disconnect();
    };
    this.killInfinityScroll = this.killer.bind(this);

    // строитель списка фильмов на "page-index"
    this.sortArray = [];
    this.insertListItem = function(objData) {
      if (localStorage.getItem("mediaType") === "movie") {
        this.arrRes = objData.results.map(el => {
          el.release_date = new Date(el.release_date).getFullYear();
          return el;
        });
        this.sortArray.push(...this.arrRes);
      } else if (localStorage.getItem("mediaType") === "TV") {
        this.arrRes = objData.results.map(el => {
          el.first_air_date = new Date(el.first_air_date).getFullYear();
          return el;
        });
        this.sortArray.push(...this.arrRes);
      }
      this.markup = filmsTemplate(this.arrRes);
      this.refs.filmsList.insertAdjacentHTML("beforeend", this.markup);
      api.increment();
    };
    this.builderListItemOnPageIndex = this.insertListItem.bind(this);

    // обработчик на клик по модалке
    this.clickCloseSearchBlockHandler = function(e) {
      if (e.target.className !== "search_modal") {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnVoid = this.clickCloseSearchBlockHandler.bind(this);

    // обработчик на клик по "Esc"
    this.keyPressHandle = function(e) {
      if (e.code !== "Escape") {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnEsc = this.keyPressHandle.bind(this);
  }

  // ТЕЛО КЛАССА

  // обработчик открытия модального окна "search"
  openSearchBlockHandler() {
    window.addEventListener("keydown", this.clickOnEsc);
    window.addEventListener("click", this.clickOnVoid);

    this.refs.searchBlock.classList.add("open_search");
    this.refs.searchInput.focus();
    this.refs.searchForm.addEventListener("submit", this.clickOnSearchBtn);
  }

  // обработчик закрытия модального окна "search"
  closeSearchBlockHandler() {
    this.refs.searchBlock.classList.remove("open_search");
    this.refs.searchForm.removeEventListener("submit", this.clickOnSearchBtn);

    window.removeEventListener("keydown", this.clickOnEsc);
    window.removeEventListener("click", this.clickOnVoid);
  }

  // Рендеринг найденых фильмов
  renderSearchingFilm() {
    return api
      .getSearching()
      .then(data => {
        if (data.total_pages < api.page) {
          this.killInfinityScroll();
          return;
        }
        this.builderListItemOnPageIndex(data);
        this.infinityScroll();
      })
      .catch(error => {
        console.warn(error);
      });
  }

  // Рендеринг популярных фильмов
  renderPopularFilms() {
    return api
      .getPopularFilms()
      .then(data => {
        if (data.total_pages < api.page) {
          this.killInfinityScroll();
          return;
        }
        localStorage.setItem("mediaType", "movie");
        this.builderListItemOnPageIndex(data);
        this.infinityScroll();
      })
      .catch(error => console.warn(error));
  }

  // Рендеринг TV сериалов
  renderTvShows() {
    return api
      .getPopularTvShows()
      .then(data => {
        if (data.total_pages < api.page) {
          this.killInfinityScroll();
          return;
        }
        localStorage.setItem("mediaType", "TV");
        this.builderListItemOnPageIndex(data);
        this.infinityScroll();
      })
      .catch(error => console.warn(error));
  }

  // очистка HTML
  clearList() {
    this.refs.filmsList.innerHTML = "";
  }

  // обработчик на кнопку "scroll up"
  scrollToUpHandler() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // // обработчик на клик по "btn sort by name"
  // clickOnBtnName() {
  //   console.log('name');
  // }

  // обработчик на клик по "btn sort by date"
  clickOnBtnDate() {
    console.log("date");
    newApp.openPreloader();
    this.killInfinityScroll();
    if (localStorage.getItem("mediaType") === "movie") {
      this.sortArrayAZ = this.sortArray.sort(
        (a, z) => a.release_date - z.release_date
      );
    } else if (localStorage.getItem("mediaType") === "TV") {
      this.sortArrayAZ = this.sortArray.sort(
        (a, z) => a.first_air_date - z.first_air_date
      );
    }
    this.sortMarkup = filmsTemplate(this.sortArrayAZ);
    this.refs.filmsList.innerHTML = this.sortMarkup;
    // console.log('Sort a-z:', this.arraySortDate.sort());
    // console.log('Sort z-a:', this.arraySortDate.sort((a,z) => z-a));
    newApp.closePreloader();
  }
}

new Mooogle();
