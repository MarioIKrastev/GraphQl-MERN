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
      <button type="button" className="btn btn-secondary" onClick={onSubmit}>
        <p className="text-light m-0">Sign out</p>
      </button>
    </>
  );
}
