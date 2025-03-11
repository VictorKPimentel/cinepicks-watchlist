import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Layout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="app-container">
      <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Hamburger Menu - Only visible when the screen is smaller than 768px */}
        {/* Hide the hamburger when sidebar is open */}
        {!sidebarOpen && <FaBars className="hamburger" onClick={toggleSidebar} />}
        <Outlet /> {/* Renders the current page content */}
      </div>
      <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Layout;