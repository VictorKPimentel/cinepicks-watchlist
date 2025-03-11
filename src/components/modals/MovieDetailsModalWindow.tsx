import "./MovieDetailsModalWindow.scss";
import MovieProfile from "../MovieProfile";
import { IoClose } from "react-icons/io5"; // Import close icon from react-icons
import { useModal } from "../../context/ModalContext";

function MovieDetailsModalWindow () {

    const { isModalOpen, selectedMovie, closeModal } = useModal();

    if (!isModalOpen || !selectedMovie) return null;

    return (
        <>
            <div className="modal-wrapper" aria-modal="true"
                role="dialog">
                <div className="inner">
                    <IoClose className="close-btn" onClick={closeModal} />
                    <MovieProfile movie={selectedMovie}/>
                </div>
            </div>
        </>
    );
}

export default MovieDetailsModalWindow;