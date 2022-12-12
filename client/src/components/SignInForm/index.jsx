import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import jwt_decode from "jwt-decode";

import { Cookies } from "react-cookie";
import { login } from "../../slices/authSlice";
import { clientInfo } from "../../slices/clientSlice";

export default function SignInForm() {
  const navigation = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();
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
      dispatch(
        clientInfo({
          id,
          name,
          email,
          isAuthorized: true,
        })
      );
      navigation("/dashboard");
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
      className="card w-25 container mt-5 p-0"
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
                <button type="submit" className="btn btn-secondary">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
