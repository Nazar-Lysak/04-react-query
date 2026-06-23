import { useEffect, useState } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

function App() {
  const [showMovie, setShowMovie] = useState<Movie | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["myQueryKey", topic, page],
    queryFn: () => fetchMovies(topic, page),
    placeholderData: keepPreviousData,
    enabled: topic.length > 0,
  });

  useEffect(() => {
    if (isSuccess && topic && data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data, topic]);

  const openPopup = (movie: Movie) => {
    setShowMovie(movie);
  };

  const closePopup = () => {
    setShowMovie(null);
  };

  const onSubmit = async (query: string) => {
    setPage(1);
    setTopic(query);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={openPopup} />
      )}
      {showMovie && <MovieModal movie={showMovie} onClose={closePopup} />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
