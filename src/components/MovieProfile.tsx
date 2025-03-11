import "./MovieProfile.scss";
import { Movie } from "../types/Movie";
import { useWatchlist } from "../context/WatchlistContext";

function MovieProfile ({movie} : {movie: Movie}) {

    const {watchlist, addMovie, removeMovie} = useWatchlist();

    // Check if the movie is already in the watchlist
    const isInWatchlist = watchlist.movies.some((item) => item.id === movie.id);
    
    function getGenreString (genre_id : number) : string {
        switch (genre_id) {
            case 28 :
                return "Action";
            case 12 :
                return "Adventure";
            case 16 :
                return "Animation";
            case 35 :
                return "Comedy";
            case 80 :
                return "Crime";
            case 99 :
                return "Documentary";
            case 18 :
                return "Drama";
            case 10751 :
                return "Family";
            case 14 :
                return "Fantasy";
            case 36 :
                return "History";
            case 27 :
                return "Horror";
            case 10402 :
                return "Music";
            case 9648 :
                return "Mystery";
            case 10749 :
                return "Romance";
            case 878 :
                return "Science Fiction";
            case 10770 :
                return "TV Movie";
            case 53 :
                return "Thriller";
            case 10752 :
                return "War";
            case 37 :
                return "Western"
            default :
                return ""
        }
    }

    function handleMovieAddition(){
        addMovie(movie);
    }

    function handleMovieRemoval(){
        removeMovie(movie.id);
    }

    return (
        <div className="movieProfile">
            <div className="moviePoster">
            <img src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "./popcorn.png"} alt={movie?.id.toString()} />
            </div>
            <div className="movieInfo">
            <h4 className="movieTitle">{movie?.title} {(movie?.title !== movie?.original_title) ?  "(" + movie?.original_title + ")" : ""}</h4>
            {(movie.vote_average && movie.vote_average > 0) ? (<p>Rating: {movie?.vote_average.toFixed(1)}/10</p>) : null}
            <p className="overview">
                {movie?.overview}
            </p>
            <p className="year-genre">
                {movie?.release_date?.substring(0,4)} 
                {(movie.genre_ids && movie.genre_ids.length > 0) ? (" | " + movie?.genre_ids?.map((genreID) => (
                    " " + getGenreString(genreID)
                ))) : null}
            </p>
            
            {/* Conditionally render buttons */}
            {!isInWatchlist ? (
                <button className="add-button" onClick={handleMovieAddition}>
                    Add To Watchlist
                </button>
            ) : (
                <button className="remove-button" onClick={handleMovieRemoval}>
                    Remove From Watchlist
                </button>
            )}

            {isInWatchlist && <p className="addedToWatchlist added">Already added to watchlist.</p>}
            </div>
        </div>
    );
}

export default MovieProfile;