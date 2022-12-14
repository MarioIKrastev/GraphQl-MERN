import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import logo from "../assets/wrc.png";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import SignOut from "../SignOut";
import { Box, Button } from "@mui/material";

export default function Header() {
  const navigation = useNavigate();

  const signedIn = localStorage.getItem("SignedIn");
  return (
    <>
      <nav className="navbar bg-light p-0">
        <div className="container">
          <Box
            sx={{ width: "100px", height: "100px", cursor: "pointer" }}
            onClick={() => navigation("/")}
          >
            <img src={logo} alt="logo" width={100} height={100} />
          </Box>
          {signedIn === "true" ? (
            <ul className="navbar-nav d-flex flex-row gap-2">
              <li className="navbar-item">
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    height: "100%",
                    p: 0,
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                  onClick={() => navigation("/profile")}
                >
                  <FaUser />
                </Button>
              </li>
              <li className="navbar-item">
                <Button
                  type="button"
                  variant="contained"
                  sx={{ "&:hover": { backgroundColor: "primary.light" } }}
                  onClick={() => navigation("/dashboard")}
                >
                  <p style={{ margin: 0 }}>Dashboard</p>
                </Button>
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
