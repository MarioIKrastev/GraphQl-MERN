import logo from "../assets/logo.png";
import FormClient from "../FormClient";

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
            <button className="btn btn-info">
              <p className="text-light m-0">Log In</p>
            </button>
          </li>
          <li className="navbar-item">
            <FormClient />
          </li>
        </ul>
      </div>
    </nav>
  );
}
