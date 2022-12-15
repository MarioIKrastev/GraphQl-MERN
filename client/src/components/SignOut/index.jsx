import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { clientInfo } from "../../slices/clientSlice";

export default function SignOut() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);

  const onSubmit = (e) => {
    e.preventDefault();
    removeCookie("Authorization");
    dispatch(logout());
    dispatch(
      clientInfo({
        id: "",
        name: "",
        email: "",
        isAuthorized: false,
      })
    );
    localStorage.clear();
    return navigation("/");
  };
  return (
    <>
      <Button
        type="button"
        variant="contained"
        sx={{
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "tertiary.main",
          },
          "&:hover > p": {
            color: "primary.main",
          },
        }}
        onClick={onSubmit}
      >
        <p style={{ margin: 0 }}>Sign out</p>
      </Button>
    </>
  );
}
