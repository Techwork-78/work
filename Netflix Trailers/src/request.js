export const KEY = "ddc242ac9b33e6c9054b5193c541ffbb";

export const imdb = `/movie?api_key=${KEY}`;

const requests = {
  fetchUpcoming: `/movie/upcoming?api_key=${KEY}&language=en-US&page=1`,
  fetchTrending: `/trending/all/week?api_key=${KEY}&language=en-US`,
  fetchOriginals: `/discover/tv?api_key=${KEY}&with_networks=213&sort_by=first_air_date.desc&page=2`,
  fetchTopRated: `/movie/top_rated?api_key=${KEY}&language=en-US`,
  fetchAction: `/discover/movie?api_key=${KEY}&with_genres=28`,
  fetchComedy: `/discover/movie?api_key=${KEY}&with_genres=35`,
  fetchHorror: `/discover/movie?api_key=${KEY}&with_genres=27`,
  fetchRomance: `/discover/movie?api_key=${KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${KEY}&with_genres=99`,
};

export default requests;
