import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number 
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (findMovie : string | null, page : number): Promise<FetchMoviesResponse> => {
  const {data} = await axios.get<FetchMoviesResponse>("https://api.themoviedb.org/3/search/movie", {
    params: {
      query: findMovie,
      page
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  console.log(data)

  return data;
};
