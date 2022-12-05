import logo from "../assets/logo.png";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import SignOut from "../SignOut";

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a href="/">
          <div>
            <img src={logo} alt="logo" className="mr-2" />
            <span className="navbar-brand">ProjectMgmt</span>
          </div>
        </a>
        <ul className="navbar-nav d-flex flex-row gap-2">
          <li className="navbar-item">
            <SignIn />
          </li>
          <li className="navbar-item">
            <SignUp />
          </li>
          <li className="navbar-item">
            <SignOut />
          </li>
        </ul>
      </div>
    </nav>
  );
}
