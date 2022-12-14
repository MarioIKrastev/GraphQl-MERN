import axios from "axios";

import { useReducer } from "react";
import { Router } from "react-router-dom";

export default function SignUp() {
  const initState = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };
  const [state, updateState] = useReducer(
    (prev, curr) => ({ ...prev, ...curr }),
    initState
  );

  const data = {
    name: state.name,
    email: state.email,
    password: state.password,
    phone: state.phone,
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", data);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
    updateState({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-toggle="modal"
        data-target="#signUpClientModal"
      >
        <p className="text-light m-0">Sign up</p>
      </button>
      <div
        className="modal fade"
        id="signUpClientModal"
        role="dialog"
        aria-labelledby="signUpClientModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signUpClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="close btn btn-primary"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={state.name}
                  onChange={(e) => updateState({ name: e.target.value })}
                />
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
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={state.phone}
                  onChange={(e) => updateState({ phone: e.target.value })}
                />
                <div className="d-flex justify-content-between">
                  <button className="btn btn-secondary " type="submit">
                    Submit
                  </button>
                  <button
                    className="btn btn-primary "
                    type="submit"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
