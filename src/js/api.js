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

export function getSingleFilm(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=credits`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFilmTitle(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=original_title`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=original_name`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFilmContries(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=production_countries`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=origin_country`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleFilmTagline(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=tagline`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=vote_average`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
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

export function getSingleGenres(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=genres`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=genres`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleRuntime(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=runtime`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=number_of_seasons`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}
export function getSingleNumberOfEpisodes() {
  const url = `${baseUrl}/tv/popular?api_key=${api_key}&append_to_response=number_of_episodes`;
  return fetch(url).then(res => res.json());
}

export function getSingleLastEpisode() {
  const url = `${baseUrl}/tv/popular?api_key=${api_key}&append_to_response=last_air_date`;
  return fetch(url).then(res => res.json());
}

export function getSingleOwerview(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=overview`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=overview`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSinglePoster(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=poster_path`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=poster_path`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSinglePosterLittle(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=backdrop_path`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=backdrop_path`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleDataRealise(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=release_date`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=first_air_date`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}
export function getSingleDirector(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=created_by`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getSingleScreenPlay(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}&append_to_response=in_production`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function getDetailsById(id, mediaType) {
  let url;
  if (mediaType === "movie") {
    url = `${baseUrl}/movie/${id}?api_key=${api_key}`;
  } else
    url = `${baseUrl}/tv/${id}?api_key=${api_key}`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.warn(error));
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
  getPopularTvShows() {
    const url = `${baseUrl}/tv/popular?api_key=${api_key}&append_to_response=credits&page=${
      this.page
    }`;
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
