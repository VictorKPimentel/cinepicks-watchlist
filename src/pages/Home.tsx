import { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import Carousel from '../components/Carousel';
import SearchArea from '../components/SearchArea';
import FullPageLoader from '../components/FullPageLoader';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from "firebase/auth";
import { useUser } from '../context/UserContext';

// Helper to calculate date for the past 30 days
const getThirtyDaysAgo = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
};

function Home() {

  const {dispatch} = useUser();

  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
      //Persist user's login state. (e.g. if a new tab or window is opened, it keeps the user logged in)
      onAuthStateChanged(auth, (user) => {
        dispatch({
          type: "setUser",
          payload: user ? { userUID: user.uid, email: user.email } : null,
        });
      });

      const api_key = import.meta.env.VITE_TMDB_API_KEY;

      const fetchMovies = async () => {
          const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + api_key
              }
          };

          try {
            const resTopRated = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99&vote_count.gte=200", options);
            const dataTopRated = await(resTopRated.json());
            setTopRatedMovies(dataTopRated.results as Movie[]); // Cast to Movie[]

            const today = new Date().toISOString().split('T')[0]; // Today
            var thirtyDaysAgo = getThirtyDaysAgo();

            const resNew = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${thirtyDaysAgo},release_date.lte=${today}`, options);
            const dataNew = await(resNew.json());
            setNewMovies(dataNew.results as Movie[]); // Cast to Movie[]
          } catch (error) {
            setError('Failed to fetch movies. Please try again later.');
          } finally {
            setLoading(false);
          }
      }

      fetchMovies();
  }, []);

  return (
    <>
      <div className="home">
            <img src="/popcorn.png" alt="hero_image" />

            <div className="container">
              <SearchArea />

              <h3>Top Rated Movies</h3>
              {loading ? (
                <FullPageLoader />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <Carousel movies={topRatedMovies} />
              )}

              <h3>Newly Added</h3>
              {loading ? (
                <FullPageLoader />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <Carousel movies={newMovies} />
              )}
            </div>
      </div>

    </>
  )
}

export default Home
