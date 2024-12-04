import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import LinksNav from "./linksNav";
function NavBar() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="nav">
      {/* Brand */}
      <h3>
        <Link to="/">
          {" "}
          Fitness <span style={{ color: "var(--mainColor)" }}>Club</span>
        </Link>
      </h3>

      {/* SignIn */}
      {/* SignUp */}
      <ul className={`navlinks ${navOpen ? "show" : ""}`}>
        <LinksNav />
      </ul>
      {/* Menu Icon */}
      <div className="nav-menu-icon" onClick={toggleNav}>
        {navOpen ? <CloseOutlined /> : <MenuOutlined />}
      </div>
      {/* Profile (Auth) */}
    </nav>
  );
}

export default NavBar;
