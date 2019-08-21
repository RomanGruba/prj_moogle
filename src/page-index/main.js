import "../scss/main.scss";
import "./page.scss";
import "../scss/header.scss";
import filmsTemplate from "./templates/template.hbs";
import api from "../js/api.js";
import newApp from "../js/app.js";
import { handleFavorite, removeFavoriteItem } from "./favorite";

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
      buttonFavorite: document.querySelector(".header-items-click--favorite"),
      // toggle-btn + Sidebar
      buttonShowSidebar: document.querySelector(".toggle-btn"),
      sidebarItem: document.querySelector(".sidebar"),
      menuList: document.getElementById("menu-list")
    };

    this.renderedData = [];
    this.favoriteArr = [];

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

    // слушатель на кнопке "btn sort by name"
    this.refs.btnSortName.addEventListener(
      "click",
      this.clickOnBtnName.bind(this)
    );

    // слушатель на кнопке "btn sort by date"
    this.refs.btnSortDate.addEventListener(
      "click",
      this.clickOnBtnDate.bind(this)
    );

    //listener mobile Oleksii
    this.refs.buttonTvShow.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloaderUL();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.sortArray = [];
        this.renderTvShows().then(() => this.scrollToUp());
        this.hideSidebar();
        newApp.closePreloaderUL();
      }
    });

    //listener desktop Oleksii
    this.refs.headerButtonTvShow.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloaderUL();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.sortArray = [];
        this.renderTvShows().then(() => this.scrollToUp());
        newApp.closePreloaderUL();
        setTimeout(() => {
          if (localStorage.getItem("mediaType") === "TV") {
            this.refs.buttonFavorite.classList.remove("active-focus");
            this.refs.headerButtonFilm.classList.remove("active-focus");
            this.refs.headerButtonTvShow.classList.add("active-focus");
          }
        }, 1000)
      }
    });

    //listener mobile Oleksii
    this.refs.buttonFilm.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloaderUL();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.sortArray = [];
        this.renderPopularFilms().then(() => this.scrollToUp());
        this.hideSidebar();
        newApp.closePreloaderUL();
      }
    });

    //listener desktop Oleksii
    this.refs.headerButtonFilm.addEventListener("click", event => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        newApp.openPreloaderUL();
        api.resetPage();
        this.clearList();
        this.killInfinityScroll();
        this.sortArray = [];
        this.renderPopularFilms().then(() => this.scrollToUp());
        newApp.closePreloaderUL();
        setTimeout(() => {
          if (localStorage.getItem("mediaType") === "movie") {
            this.refs.buttonFavorite.classList.remove("active-focus");
            this.refs.headerButtonTvShow.classList.remove("active-focus");
            this.refs.headerButtonFilm.classList.add("active-focus");
          }
        }, 1000)
      }
    });

    // слушатель на click on image and star
    this.refs.filmsList.addEventListener("click", event => {
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
          handleFavorite.call(this, event);

          let el = event.target;
          if (!el.classList.contains("icon-star")) {
            el = el.closest(".icon-star");
          }
          el.classList.toggle("fill-white");
          el.classList.toggle("fill-gold");
        }
      }
    });

    // слушатель на click favorites Roman
    this.refs.buttonFavorite.addEventListener("click", event => {
      event.preventDefault();
      localStorage.setItem("mediaType", "favorites");
      this.killInfinityScroll();
      const markup = filmsTemplate(
        JSON.parse(localStorage.getItem("favorites"))
      );
      this.clearList();
      this.refs.filmsList.insertAdjacentHTML("beforeend", markup);
      let allStars = document.querySelectorAll(".icon-star");
      allStars.forEach(el => {
        el.classList.remove("fill-white");
        el.classList.add("fill-gold");
      });
      if (localStorage.getItem("mediaType") === "favorites") {
        this.refs.headerButtonFilm.classList.remove("active-focus");
        this.refs.headerButtonTvShow.classList.remove("active-focus");
        this.refs.buttonFavorite.classList.add("active-focus");
      }
      removeFavoriteItem.call(this);
    });

    // слушатель на
    //     this.refs.buttonIconStar.addEventListener("click", event => {
    //       event.preventDefault();
    //       if (event.target === event.currentTarget) {
    //         localStorage.setItem("status", "favorite");
    //         this.iconStar.style.cssText = "fill: gold";
    //       }
    //     });

    // sidebar showup Vika
    this.flagShowBurger = true; //show flag aka hang the flag

    this.showBurger = function () {
        this.refs.menuList.classList.add("active");
        window.addEventListener("keydown", this.clickOnEscape);
        window.addEventListener("click", this.clickOnModal);
        document.body.classList.add("modal-overlay-menu");
        this.flagShowBurger = false;
    };
    this.showSidebar = this.showBurger.bind(this);

    this.hideBurger = function () {
      this.refs.menuList.classList.remove("active");
      window.removeEventListener("keydown", this.clickOnEscape);
      window.removeEventListener("click", this.clickOnModal);
      document.body.classList.remove("modal-overlay-menu");
      this.flagShowBurger = true;
    };
    this.hideSidebar = this.hideBurger.bind(this);

    this.BurgerOnClick = function () {
      if (this.flagShowBurger) {
        this.showSidebar();
      }else {
        this.hideSidebar();
      }
    };
    this.SidebarOnClick = this.BurgerOnClick.bind(this);

    //close BURGER on Escape
    this.closeBurgerEscape = function (e) {
      if (e.code !== "Escape") {
        return;
      }
      this.hideSidebar();
    };
    this.clickOnEscape = this.closeBurgerEscape.bind(this);

    //close BURGER on Modal
    this.closeBurgerModal = function (e) {
      if (e.target.className !== "sidebar") {
        return;
      }
      this.hideSidebar();
    };
    this.clickOnModal = this.closeBurgerModal.bind(this);

    this.refs.buttonShowSidebar.addEventListener("click", this.SidebarOnClick);

    // end of sidebar showUp
    // обработчик поиска
    this.searchingHandler = function (e) {
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
    this.onEnBtnUp = function (e) {
      if (e[0].isIntersecting) {
        this.refs.scrollUpBtn.classList.toggle("is-hidden");
      }
    };
    this.onEntryBtnUp = this.onEnBtnUp.bind(this);
    this.scrlToUp = function () {
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
    this.onEntInfScr = function (e) {
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
    this.infScrl = function () {
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
    this.killer = function () {
      this.observerInfScrl.disconnect();
    };
    this.killInfinityScroll = this.killer.bind(this);

    // строитель списка фильмов на "page-index"
    this.sortArray = [];
    this.flagSortName = true;
    this.flagSortDate = true;
    this.insertListItem = function (objData) {
      if (localStorage.getItem("mediaType") === "movie") {
        this.arrRes = objData.results.map(el => {
          let itemsToColor = JSON.parse(localStorage.getItem("favorites"));
        itemsToColor.forEach(element => {
          if (element.id == el.id) {
            el.toBeColored = true;
          }
        });
          el.release_date = new Date(el.release_date).getFullYear();
          this.renderedData.push(el);
          return el;
        });
        this.sortArray.push(...this.arrRes);
      } else if (localStorage.getItem("mediaType") === "TV") {
        this.arrRes = objData.results.map(el => {
          let itemsToColor = JSON.parse(localStorage.getItem("favorites"));
        itemsToColor.forEach(element => {
          if (element.id == el.id) {
            el.toBeColored = true;
          }
        });
          el.first_air_date = new Date(el.first_air_date).getFullYear();
          this.renderedData.push(el);
          return el;
        });
        this.sortArray.push(...this.arrRes);
      }
      this.markup = filmsTemplate(this.arrRes);
      //       this.newArrRes = objData.results.map(el => {
      // //         let itemsToColor = JSON.parse(localStorage.getItem("favorites"));
      // //         itemsToColor.forEach(element => {
      // //           if (element.id == el.id) {
      // //             el.toBeColored = true;
      // //           }
      // //         });

      //   el.release_date = new Date(el.release_date).getFullYear();
      //   this.renderedData.push(el);
      //   return el;
      // });
      // this.markup = filmsTemplate(this.newArrRes);
      this.refs.filmsList.insertAdjacentHTML("beforeend", this.markup);
      api.increment();
    };
    this.builderListItemOnPageIndex = this.insertListItem.bind(this);

    // обработчик на клик по модалке
    this.clickCloseSearchBlockHandler = function (e) {
      if (e.target.className !== "search_modal") {
        return;
      }
      this.closeSearchBlockHandler();
    };
    this.clickOnVoid = this.clickCloseSearchBlockHandler.bind(this);

    // обработчик на клик по "Esc"
    this.keyPressHandle = function (e) {
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
        console.log(data);
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

  // обработчик на клик по "btn sort by name"
  clickOnBtnName() {
    newApp.openPreloader();
    this.killInfinityScroll();
    if (this.flagSortName) {
      if (localStorage.getItem("mediaType") === "movie") {
        this.sortArrayNameAZ = this.sortArray.sort((a, z) => {
          let nameA = a.title.toLowerCase();
          let nameZ = z.title.toLowerCase();
          if (nameA < nameZ) return -1;
          if (nameA > nameZ) return 1;
        });
      } else if (localStorage.getItem("mediaType") === "TV") {
        this.sortArrayNameAZ = this.sortArray.sort((a, z) => {
          let nameA = a.original_name.toLowerCase();
          let nameZ = z.original_name.toLowerCase();
          if (nameA < nameZ) return -1;
          if (nameA > nameZ) return 1;
        });
      }
      this.sortMarkupName = filmsTemplate(this.sortArrayNameAZ);
      this.flagSortName = false;
    } else {
      if (localStorage.getItem("mediaType") === "movie") {
        this.sortArrayNameZA = this.sortArray.sort((a, z) => {
          let nameA = a.title.toLowerCase();
          let nameZ = z.title.toLowerCase();
          if (nameA > nameZ) return -1;
          if (nameA < nameZ) return 1;
        });
      } else if (localStorage.getItem("mediaType") === "TV") {
        this.sortArrayNameZA = this.sortArray.sort((a, z) => {
          let nameA = a.original_name.toLowerCase();
          let nameZ = z.original_name.toLowerCase();
          if (nameA > nameZ) return -1;
          if (nameA < nameZ) return 1;
        });
      }
      this.sortMarkupName = filmsTemplate(this.sortArrayNameZA);
      this.flagSortName = true;
    }
    this.refs.filmsList.innerHTML = this.sortMarkupName;
    newApp.closePreloader();
  }

  // обработчик на клик по "btn sort by date"
  clickOnBtnDate() {
    newApp.openPreloader();
    this.killInfinityScroll();
    if (this.flagSortDate) {
      if (localStorage.getItem("mediaType") === "movie") {
        this.sortArrayDateAZ = this.sortArray.sort(
          (a, z) => new Date(a.release_date) - new Date(z.release_date)
        );
      } else if (localStorage.getItem("mediaType") === "TV") {
        this.sortArrayDateAZ = this.sortArray.sort(
          (a, z) => new Date(a.first_air_date) - new Date(z.first_air_date)
        );
      }
      this.sortMarkupDate = filmsTemplate(this.sortArrayDateAZ);
      this.flagSortDate = false;
    } else {
      if (localStorage.getItem("mediaType") === "movie") {
        this.sortArrayDateZA = this.sortArray.sort(
          (a, z) => new Date(z.release_date) - new Date(a.release_date)
        );
      } else if (localStorage.getItem("mediaType") === "TV") {
        this.sortArrayDateZA = this.sortArray.sort(
          (a, z) => new Date(z.first_air_date) - new Date(a.first_air_date)
        );
      }
      this.sortMarkupDate = filmsTemplate(this.sortArrayDateZA);
      this.flagSortDate = true;
    }
    this.refs.filmsList.innerHTML = this.sortMarkupDate;
    newApp.closePreloader();
  }
}

new Mooogle();
