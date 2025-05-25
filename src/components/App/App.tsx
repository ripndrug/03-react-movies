import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import fetchData from '../../services/movieService';
import { type Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSearch(newMovies: string) {
    setMovies([]);
    try {
      setIsError(false);
      setIsLoading(true);
      const updatedMovies = await fetchData(newMovies);
      setIsLoading(false);
      if (updatedMovies.length === 0) {
        toast.error('No movies found for your request.');
      } else {
        setMovies(updatedMovies);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  }

  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid onSelect={handleSelectMovie} movies={movies} />
      )}
      {isError && <ErrorMessage />}
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </>
  );
}
