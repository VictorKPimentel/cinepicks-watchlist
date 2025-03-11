import { useState, useEffect } from "react";
import { Movie } from "../types/Movie";
import "./Carousel.scss";
import MovieCard from "./MovieCard";


const Carousel = ({movies} : {movies: Movie[]}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(5); // Default for large screens

    // Dynamically update visibleSlides based on screen width
    useEffect(() => {
        const updateSlides = () => {
            if (window.innerWidth <= 480) {
                setVisibleSlides(2);
            } else if (window.innerWidth <= 768) {
                setVisibleSlides(3);
            } else if (window.innerWidth <= 1024) {
                setVisibleSlides(4);
            } else {
                setVisibleSlides(5);
            }
        };

        updateSlides();
        window.addEventListener("resize", updateSlides);
        return () => window.removeEventListener("resize", updateSlides);
    }, []);

    const nextSlide = () => {
        setStartIndex((prev) => Math.min(prev + 1, movies.length - visibleSlides));
    };

    const prevSlide = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="carousel">
            <button className="prev" onClick={prevSlide}>&#10094;</button>

            <div className="slider">
                <div 
                    className="movieCardsSlides"
                    style={{ transform: `translateX(-${startIndex * (100 / visibleSlides)}%)` }}
                >
                    {movies.map((movie, index) => (
                        <MovieCard key={index} movie={movie}/>
                    ))}
                </div>
            </div>

            <button className="next" onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

export default Carousel;