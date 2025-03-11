import { createContext, useContext, useState, useReducer, useEffect, useCallback } from "react";
import { Movie } from "../types/Movie";
import { arrayUnion, getDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useUser } from "./UserContext";

export interface Watchlist {
    movies: Movie[]
}

type WatchlistAction = 
    {type: "setWatchlist"; payload: Movie[] } | // Load from Firestore
    {type: "addToWatchlist"; payload: Movie} |
    {type: "removeFromWatchlist"; payload: number}


// Define Context Interface
interface WatchlistContext {
    watchlist: Watchlist;
    isLoading: boolean;
    setWatchlist: () => Promise<void>; // New function to fetch watchlist from Firestore
    addMovie: (movie: Movie) => Promise<void>;
    removeMovie: (movieID: number) => Promise<void>;
}

const initialWatchlist : Watchlist = { movies : [] };

const WatchlistContext = createContext<WatchlistContext | undefined>(undefined);

export function WatchlistProvider({children}: {children: React.ReactElement}){
    const [watchlist, watchlist_dispatch] = useReducer(WatchlistReducer, initialWatchlist);
    const [isLoading, setisLoading] = useState(true);
    const {user} = useUser();

    useEffect(() => {
        if (user) {
            const pendingMovie = localStorage.getItem("pendingMovie");
            if (pendingMovie) {
                const movie = JSON.parse(pendingMovie);
                addMovie(movie);
                localStorage.removeItem("pendingMovie"); // Clear storage after adding
            }
        }
    }, [user]); // Runs when the user logs in

    // Function to Set Watchlist from Firestore
    const setWatchlist = useCallback(async () => {
        if (!user) {
            watchlist_dispatch({ type: "setWatchlist", payload: [] }); // If no user logged in, set empty array
            setisLoading(false);
            return;
        }

        try{
            const userDocRef = doc(db, "watchlist", user.userUID ? user.userUID : "");
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const movieIDs: number[] = docSnap.data().movies || [];
                
                const api_key = import.meta.env.VITE_TMDB_API_KEY;
                
                // Fetch movie details from TMDB API
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer ' + api_key
                    }
                };

                const movieDetailsPromises = movieIDs.map(async (id) => {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
                    return response.json();
                });

                const movies = await Promise.all(movieDetailsPromises);
                watchlist_dispatch({ type: "setWatchlist", payload: movies });
            } else {
                watchlist_dispatch({ type: "setWatchlist", payload: [] }); // If no data, set empty array
            }
        } catch (error) {
            alert("Error fetching watchlist:" + error);
        } finally {
            setisLoading(false);
        }
    }, [user]);

    // Function to add a movie
    const addMovie = useCallback(async (movie: Movie) => {
        if (!user){
            // Store selected movie in localStorage
            localStorage.setItem("pendingMovie", JSON.stringify(movie));
            // Redirect user to login page
            window.location.href = "/profile";
            return;
        } 
        
        try{
            const userDocRef = doc(db, "watchlist", user.userUID ?? "");

            try {
                // Check if document exists
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    // Update existing document
                    await updateDoc(userDocRef, { movies: arrayUnion(movie.id) });
                } else {
                    // Create new document
                    await setDoc(userDocRef, { movies: [movie.id] }, { merge : true });
                }

                watchlist_dispatch({ type: "addToWatchlist", payload: movie });

            } catch (error) {
                alert("Error updating watchlist:" + error);
            }      
        } catch (error) {
            alert("Error adding movie:" + error);
        }
    }, [user]);

    // Function to remove a movie
    const removeMovie = useCallback(async (movieID: number) => {
        if (!user) return;
        
        try{
            const userDocRef = doc(db, "watchlist", (user.userUID ? user.userUID : ""));
            const updatedMovies = watchlist.movies.filter(m => m.id !== movieID).map(m => m.id);
            
            if (updatedMovies.length === 0) {
                await deleteDoc(userDocRef); // Delete the document if empty
            } else {
                await setDoc(userDocRef, { movies: updatedMovies }, { merge: true });
            }

            watchlist_dispatch({ type: "removeFromWatchlist", payload: movieID });
        } catch (error) {
            alert("Error removing movie:" + error);
        }
    }, [user, watchlist.movies]);

    return (
        <WatchlistContext.Provider value={{watchlist, isLoading, setWatchlist, addMovie, removeMovie}}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error("useWatchlist must be used within a WatchlistProvider");
    }
    return context;
}

// Reducer Function
function WatchlistReducer(state: Watchlist, action: WatchlistAction): Watchlist {
    switch (action.type) {
        case "setWatchlist":
            return { ...state, movies: action.payload }; // Set initial watchlist
        case "addToWatchlist":
            return { ...state, movies: [...state.movies, action.payload] }; // Add movie
        case "removeFromWatchlist":
            return { ...state, movies: state.movies.filter(movie => movie.id !== action.payload) }; // Remove movie
        default:
            throw new Error("Unknown action type");
    }
}