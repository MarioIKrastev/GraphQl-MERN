import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useQuery } from "@apollo/client";
import { GET_CLIENT } from "../../queries/client";

export default function SignInForm() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    email: "",
    password: "",
  };
  const [state, updateState] = useReducer(
    (prev, curr) => ({ ...prev, ...curr }),
    initState
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email: state.email,
        password: state.password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        const { id, name, email } = jwt_decode(token);
        localStorage.setItem("SignedIn", true);
        cookies.set("Authorization", `Bearer=${token}`);
        dispatch(
          login({
            id,
            name,
            email,
          })
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    updateState({
      email: "",
      password: "",
    });
  };
  return (
    <div
      className="card w-25 container mt-5"
      id="signInClient"
      role="dialog"
      aria-labelledby="signInClientLabel"
      aria-hidden="true"
    >
      <div className="dialog" role="document">
        <div className="content p-4">
          <div className="header">
            <h5 className="title" id="signInClientLabel">
              Sign In
            </h5>
          </div>
          <div className="body">
            <form onSubmit={onSubmit}>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control mb-3"
                value={state.email}
                onChange={(e) => updateState({ email: e.target.value })}
              />
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control mb-3"
                value={state.password}
                onChange={(e) => updateState({ password: e.target.value })}
              />
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary " type="submit">
                  Sign In
                </button>
                <button className="btn btn-primary " type="submit">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
