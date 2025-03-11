import "./Watchlist.scss";
import MovieCard from "../components/MovieCard";
import FullPageLoader from "../components/FullPageLoader";
import { useWatchlist } from "../context/WatchlistContext";
import { useUser } from "../context/UserContext";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router-dom";

function Watchlist () {

    const {watchlist, isLoading, setWatchlist} = useWatchlist();
    const {user, dispatch} = useUser();

    useEffect(() => {
        //Persist user's login state. (e.g. if a new tab or window is opened, it keeps the user logged in)
        onAuthStateChanged(auth, (user) => {
            dispatch({
                type: "setUser",
                payload: user ? { userUID: user.uid, email: user.email } : null,
            });
        });
    }, []);

    // Fetch watchlist when user logs in
    useEffect(() => {
        setWatchlist();
    }, [user]);

    return (
        <>
            {user ?
                (isLoading ? <FullPageLoader /> :            
                    <div className="container">
                        <h2>My Watchlist</h2>
                        <div className="movieGrid">
                            {watchlist?.movies?.map((movie, index) => (
                                    <MovieCard key={index} movie={movie} />
                            ))}
                        </div>
                    </div>
                ) :
                <div className="container">
                    <h3>You are not logged in. Please log in or sign up first to create a watchlist.</h3>
                    <NavLink to="/profile">
                        <p className="login-redirect">Login</p>
                    </NavLink>
                </div>
            }


        </>
    );
}

export default Watchlist;