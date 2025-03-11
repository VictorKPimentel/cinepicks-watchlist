import "./UserProfile.scss";
import { CgProfile } from "react-icons/cg";
import { useUser } from "../../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";


function UserProfile() {

  const {user, dispatch} = useUser();

  function handleSignOut() {
    if(confirm("Are you sure you want to log out?")) {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch({type: "setUser", payload: null})
        }).catch((error) => {
            // An error happened.
            alert("Error while logging out: " + error);
        });
    }
  }

  return (
    <div className="profile-container">
        <div className="profile-details">
            <CgProfile className="profileIcon" />
            <h4 className="userEmail">Email: {user?.email}</h4>
            <p className="logout" onClick={handleSignOut}>Logout</p>
        </div>
    </div>
  );
};

export default UserProfile;