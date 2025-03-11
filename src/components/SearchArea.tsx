import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchArea.scss";
import { Movie } from "../types/Movie";
import MovieProfile from "./MovieProfile";
import FullPageLoader from "./FullPageLoader";

function SearchArea () {
    const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
    const [query, setQuery] = useState(""); // Holds the submitted query
    const [inputValue, setInputValue] = useState(""); // Holds the input field value
    const [isLoading, setIsLoading] = useState(false);

    async function fetchMoviesByTitle(query : string) {

        const api_key = import.meta.env.VITE_TMDB_API_KEY;
        
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + api_key
            }
        };
        
        try{
            const resSearch = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}&original_language="en"`, options);
            const data = await(resSearch.json());
            setSearchedMovies(data.results as Movie[]); // Cast to Movie[]
        } catch (error) {
            alert("Error fetching movies:" + error);
            setSearchedMovies([]); // Ensure empty state on failure
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // Prevent form refresh
        setIsLoading(true);
        setQuery(inputValue); // Update the query state with inputValue
        await fetchMoviesByTitle(inputValue); // **WAIT** for the fetch to complete
        setIsLoading(false); // Only set to false AFTER fetch is done
    }

    return (
        <>
            <form className="searchbar" onSubmit={handleSubmit}>
                <FaSearch className="searchIcon"/>
                <input
                    type="text"
                    name="movieTitle"
                    id="movieInput"
                    placeholder="Search for movies by title"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Update inputValue only
                 />
                <button type="submit">search</button>
            </form>

            {isLoading ? (
                <FullPageLoader />
            ) : query ? ( // Only show results if a query has been submitted
                <div className="searchResults">
                    <h3>Search Results: {searchedMovies.length} movie(s)</h3>
                    {searchedMovies.length > 0 ? (
                        searchedMovies.map((movie) => (
                            <MovieProfile key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <p>No results found for "{query}"</p>
                    )}
                </div>
            ) : null}
        </>
    );
}

export default SearchArea;