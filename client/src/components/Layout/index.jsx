import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import SignOut from "../SignOut";

export default function Header() {
  const navigation = useNavigate();

  const signedIn = localStorage.getItem("SignedIn");
  return (
    <>
      <nav className="navbar bg-light p-0">
        <div className="container">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigation("/")}
          >
            <img src={logo} alt="logo" className="mr-2" />
          </button>
          {signedIn === "true" ? (
            <ul className="navbar-nav d-flex flex-row gap-2">
              <li className="navbar-item">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigation("/dashboard")}
                >
                  <p className="text-light m-0">Dashboard</p>
                </button>
              </li>
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
