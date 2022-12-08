import { Link, Outlet, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import SignOut from "../SignOut";
import { useEffect, useState } from "react";
import Dashboard from "../Dashboard";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const signedIn = localStorage.getItem("SignedIn");
  const navigate = useNavigate();
  useEffect(() => {
    if (signedIn) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [signedIn]);
  return (
    <>
      <nav className="navbar bg-light p-0">
        <div className="container">
          <Link to="/">
            <button type="button" className="btn btn-light">
              <img src={logo} alt="logo" className="mr-2" />
            </button>
          </Link>
          {isLogged ? (
            <ul className="navbar-nav d-flex flex-row gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard")}
              >
                <p className="text-light m-0">Dashboard</p>
              </button>
              <li className="navbar-item">
                <SignOut />
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav d-flex flex-row gap-2">
              <li className="navbar-item">
                <SignIn />
              </li>
              <li className="navbar-item">
                <SignUp />
              </li>
            </ul>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
