import {
  getSingleFilmTitle
} from '../js/api';


class FilmInfo2 {
  constructor(id) {
    this.filmId = id;
    this.apy_key = "ed5781108818e96397f9efe7bddd0923";
    this.refs = {
      filmTitle: document.querySelector('.image-mov_title')
    }
  this.renderTitle();
}

renderTitle() {
  getSingleFilmTitle(this.filmId).then(data =>
    {
      const titleMov = data.original_title;
      console.log(titleMov);
      this.refs.filmTitle.insertAdjacentHTML('afterbegin', titleMov);
    })
  }
}

const filmInfo = new FilmInfo2(76341)
