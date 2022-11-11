import logo from "../assets/logo.png";

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
            </div>
        </nav>
    );
}
