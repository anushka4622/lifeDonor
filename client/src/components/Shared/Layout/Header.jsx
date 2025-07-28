import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  //user name show krna h
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  //logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast("Logged out Successfully.");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar ">
        <div className="container-fluid">
          <div className="navbar-brand flex justify-center gap-2 items-center">
            <BiDonateBlood color="red" />
            Blood Bank app
          </div>
          <ul className="navbar-nav flex flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link flex justify-center gap-2 items-center">
                <BiUserCircle />
                Welcome{" "}
                {user?.name ||
                  user?.hospitalName ||
                  user?.organisationName}{" "}
                &nbsp;{" "}
                <span className="badge text-bg-secondary">{user?.role}</span>
              </p>
            </li>
            {(location.pathname === "/"  || location.pathname === "/donor" || location.pathname === "/hospital") ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link"> 
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
