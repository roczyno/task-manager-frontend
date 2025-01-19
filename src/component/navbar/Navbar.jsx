/* eslint-disable react/prop-types */

import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const user = userData ? userData.user : null;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="link">
          <div className="logo">TM</div>
        </Link>
        <div className="links">
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/about-us" className="link">
            <span>About Us</span>
          </Link>

          <Link to="/contact" className="link">
            <span>Contact</span>
          </Link>
        </div>
        <div className="auth">
          {user ? (
            <div className="user">
              <img
                alt=""
                src="https://images.pexels.com/photos/7552374/pexels-photo-7552374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <LogoutIcon
                titleAccess="logout"
                sx={{ cursor: "pointer" }}
                onClick={handleLogout}
              />
              <div
                className={menuOpen ? "harmburger active" : "harmburger"}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="lin1"></span>
                <span className="line2"></span>
                <span className="line3"></span>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                <button className="sign_up">Login</button>
              </Link>
              {/* <Link to="/register" className="link">
                <button className="sign_up">Sign Up</button>
              </Link> */}
            </>
          )}
        </div>
      </div>
      <Sidebar menuOpen={menuOpen} />
    </div>
  );
};
