import { createContext, useContext, useState, ReactNode } from "react";
import { Movie } from "../types/Movie";

interface ModalContextType {
    isModalOpen: boolean;
    selectedMovie: Movie | null;
    openModal: (movie: Movie) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({children} : {children: ReactNode}){
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    }

    return (
        <ModalContext.Provider value={{isModalOpen, selectedMovie, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
