const api_key = "ed5781108818e96397f9efe7bddd0923";
const baseUrl = `https://api.themoviedb.org/3`;

export function getSingleFilmTrailer(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}/videos?api_key=${api_key}`;
  } else url = `${baseUrl}/tv/${id}/videos?api_key=${api_key}`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFilmActors(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=credits`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFilm(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFilmTitle(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=original_name`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=original_name`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFilmContries(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=production_contries`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFilmTagline(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=tagline`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getPopularTvShows() {
  const url = `${baseUrl}/tv/popular?api_key=${api_key}&append_to_response=credits`;
  return fetch(url).then(res => res.json());
}

export function getSingleFilmFrames(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}/images?api_key=${api_key}`;
  } else url = `${baseUrl}/tv/${id}/images?api_key=${api_key}`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFeedback(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}/reviews?api_key=${api_key}`;
  } else url = `${baseUrl}/tv/${id}/reviews?api_key=${api_key}`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}


export function getSingleGenres(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=genres`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleRuntime(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=runtime`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleOwerview(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=overview`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSinglePoster(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=poster_path`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSinglePosterLittle(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=backdrop_path`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}
export function getSingleDataRealise(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=release_date`;
  return fetch(url).then(res => res.json())
}
export function getSingleDirector(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  return fetch(url).then(res => res.json());
}
export function getSingleScreenPlay(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  return fetch(url).then(res => res.json());
}


// ======================================
// Oleg

export default {
  page: 1,
  query: "",
  getPopularFilms() {
    const url = `${baseUrl}/movie/popular?api_key=${api_key}&append_to_response=credits&page=${
      this.page
    } `;
    return fetch(url)
      .then(res => res.json())
      .catch(error => console.warn(error));
  },
  getSearching() {
    const url = `${baseUrl}/search/movie?api_key=${api_key}&query=${
      this.query
    }&page=${this.page}`;
    return fetch(url)
      .then(res => res.json())
      .catch(error => console.warn(error));
  },
  set searchQuery(str) {
    this.query = str;
  },
  increment() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  }
};

