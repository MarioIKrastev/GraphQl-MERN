import { useReducer } from "react";
import { Router } from "react-router-dom";

export default function SignIn() {
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
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });
      const { loginToken } = await response.json();
      console.log(loginToken);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
    updateState({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target="#signInClientModal"
      >
        <p className="text-light m-0">Sign In</p>
      </button>
      <div
        className="modal fade"
        id="signInClientModal"
        role="dialog"
        aria-labelledby="signInClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signInClientModalLabel">
                Sign In
              </h5>
              <button
                type="button"
                className="close btn btn-primary"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                  <button
                    className="btn btn-secondary "
                    // data-dismiss="modal"
                    type="submit"
                  >
                    Sign In
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
