import "./MovieCard.scss";
import { Movie } from "../types/Movie";
import { useModal } from "../context/ModalContext";

function MovieCard ({movie}: {movie:Movie}) {

    const {openModal} = useModal();

    return (
        <div 
            className="movieCard"
            onClick={() => openModal(movie)}
        >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id.toString()} />
            <p>{movie.vote_average?.toFixed(1)}/10</p>
            <h4>{movie.title}</h4>
        </div>
    );
}

export default MovieCard;