import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css'

interface SearchBarProps {
  onSubmit: (query: string) => void
}

function SearchBar({onSubmit}: SearchBarProps) {

  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query");
    if (typeof query !== "string" || query.trim().length === 0) {
      toast.error("Please insert your search query.")
      return;
    }
    onSubmit(query);
  }
  return (
    <header className={styles.header}>
      {" "}
      <div className={styles.container}>
        {" "}
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB{" "}
        </a>
        {" "}
        <form className={styles.form} action={handleSubmit}>
          {" "}
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          {" "}
          <button className={styles.button} type="submit">
            Search{" "}
          </button>
          {" "}
        </form>
        {" "}
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </header>
  );
}

export default SearchBar;
