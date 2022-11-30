import axios from "axios";
import { useReducer } from "react";
import { instance } from "../../utils/axios";

export default function FormClient() {
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
  const onClick = (e) => {
    e.preventDefault();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(instance, {
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          password: state.password,
          phone: state.phone,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.status();
      console.log(data);
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
        data-target="#registerClientModal"
        onClick={onClick}
      >
        <p className="text-light m-0">Log In</p>
      </button>
      <div
        className="modal fade"
        id="registerClientModal"
        role="dialog"
        aria-labelledby="registerClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerClientModalLabel">
                Add Client
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
                <label className="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control mb-3"
                  value={state.name}
                  onChange={(e) => updateState({ name: e.target.value })}
                />
                <label className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control mb-3"
                  value={state.email}
                  onChange={(e) => updateState({ email: e.target.value })}
                />
                <label className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control mb-3"
                  value={state.password}
                  onChange={(e) => updateState({ password: e.target.value })}
                />
                <label className="form-label">Phone</label>
                <input
                  id="phone"
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
