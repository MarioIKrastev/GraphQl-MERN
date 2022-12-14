import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useMutation } from "@apollo/client";
import { EDIT_CLIENT } from "../../mutations/clientMutation";
import { GET_CLIENT } from "../../queries/client";

export default function Profile() {
  const cookie = new Cookies();
  const user = jwt_decode(cookie.get("Authorization"));
  const initState = {
    name: user.name,
    email: user.email,
    phone: user.phone,
  };
  const [state, setState] = useReducer(
    (prev, curr) => ({ ...prev, ...curr }),
    initState
  );
  const navigate = useNavigate();

  const editHandler = (e) => {
    e.preventDefault();
    editClient(state.name, state.email, state.phone);
    navigate("/profile");
  };
  const [editClient] = useMutation(EDIT_CLIENT, {
    variables: {
      id: user.id,
      name: state.name,
      email: state.email,
      phone: state.phone,
    },
  });
  return (
    <div className="container d-flex flex-column">
      <div
        className="card border border-3 p-4 d-flex align-items-center"
        style={{ margin: "0 auto" }}
      >
        <FaUser
          className="p-3"
          style={{
            borderRadius: "50%",
            backgroundColor: "red",
            width: "200px",
            height: "200px",
            color: "dark",
          }}
        />
        <div className="card-body">
          <form onSubmit={editHandler}>
            <label className="form-label m-0">Name</label>
            <input
              id="name"
              type="text"
              className="form-control mb-3"
              value={state.name}
              onChange={(e) => setState({ name: e.target.value })}
            />
            <label className="form-label m-0">Email</label>
            <input
              id="name"
              type="text"
              className="form-control mb-3"
              value={state.email}
              onChange={(e) => setState({ email: e.target.value })}
            />
            <label className="form-label m-0">Phone</label>
            <input
              id="name"
              type="text"
              className="form-control mb-3"
              value={state.phone}
              onChange={(e) => setState({ phone: e.target.value })}
            />
            <button type="submit" className="btn btn-light border-dark">
              <p className="text-danger m-0 px-2 py-1">Save</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
