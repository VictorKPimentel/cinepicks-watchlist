import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io"; // Close icon for mobile
import "./SideBar.scss";
import { useUser } from "../context/UserContext";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
  const { user } = useUser();

  return (
    <>
        {/* Overlay to block interaction outside the sidebar */}
        {isOpen && <div className="overlay" onClick={toggleSidebar} />}

        <div 
            className={`sidebar ${isOpen ? "open" : ""}`} 
            role="navigation" 
            aria-label="Sidebar navigation" 
            aria-hidden={!isOpen}
        >
        <div className="container">
            {/* Close button for mobile */}
            <button 
                className="close-button" 
                onClick={toggleSidebar} 
                aria-label="Close Sidebar"
            >
            <IoMdClose />
            </button>

            <h2 className="title">CinePicks</h2>
            <NavLink to="/profile" onClick={toggleSidebar}>
            <button className="sidebar-button profile">
                <CgProfile className="buttonIcon" />
                <span>{user ? user.email : "GUEST"}</span>
            </button>
            </NavLink>
            <NavLink to="/" onClick={toggleSidebar}>
            <button className="sidebar-button">
                <FaHome className="buttonIcon" /> Home
            </button>
            </NavLink>
            <hr />
            <NavLink to="/myWatchlist" onClick={toggleSidebar}>
            <div className="myListContainer">
                <p>My List</p>
                <p>&#10095;</p>
            </div>
            </NavLink>
        </div>
        </div>

    </>
  );
}

export default SideBar;
