const api_key = "ed5781108818e96397f9efe7bddd0923";
const baseUrl = `https://api.themoviedb.org/3`;

export function getSingleFilmTrailer(id) {
  const url = `${baseUrl}/movie/${id}/videos?api_key=${api_key}`;
  return fetch(url).then(res => res.json());
}

export function getSingleFilmActors(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  return fetch(url).then(res => res.json());
}

export function getPopularFilms() {
  const url = `${baseUrl}/movie/popular?api_key=${api_key}&append_to_response=credits`;
  return fetch(url).then(res => res.json());
}

export function getSingleFilmFrames(id) {
  const url = `${baseUrl}/movie/${id}/images?api_key=${api_key}`;
  return fetch(url).then(res => res.json());
}

export function getSingleFeedback(id) {
  const url = `${baseUrl}/movie/${id}/reviews?api_key=${api_key}`;
  return fetch(url).then(res => res.json());
}
