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
      <h3>
        <Link to="/">
          {" "}
          Fitness <span style={{ color: "var(--mainColor)" }}>Club</span>
        </Link>
      </h3>
      <ul className={`navlinks ${navOpen ? "show" : ""}`}>
        <LinksNav />
      </ul>
      <div className="nav-menu-icon" onClick={toggleNav}>
        {navOpen ? <CloseOutlined /> : <MenuOutlined />}
      </div>
    </nav>
  );
}

export default NavBar;
