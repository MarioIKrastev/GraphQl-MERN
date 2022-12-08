import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

export default function SignOut() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    removeCookie("Authorization");
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={onSubmit}>
        <p className="text-light m-0">Sign out</p>
      </button>
    </>
  );
}
