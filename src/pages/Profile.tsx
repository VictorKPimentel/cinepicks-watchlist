import AuthForm from "../components/profile_authentication/AuthForm";
import UserProfile from "../components/profile_authentication/UserProfile";
import { useUser } from "../context/UserContext";
import FullPageLoader from "../components/FullPageLoader";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function Profile () {

    const {user, dispatch} = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Persist user's login state. (e.g. if a new tab or window is opened, it keeps the user logged in)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch({
                type: "setUser",
                payload: user ? { userUID: user.uid, email: user.email } : null,
            });
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [dispatch])

    if (isLoading) return <FullPageLoader />;

    return user ? <UserProfile /> : <AuthForm />;
}

export default Profile;