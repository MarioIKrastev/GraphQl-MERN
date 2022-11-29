import { useReducer } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../../mutations/clientMutation";
import { GET_CLIENTS } from "../../queries/clients";
import { useMutation } from "@apollo/client";

export default function FormClient() {
  const initState = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };
  const [state, updateState] = useReducer(
    (prev, curr) => updateState({ ...prev, ...curr }),
    initState
  );

  const [registerClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: state.name,
      email: state.email,
      password: state.password,
      phone: state.phone,
    },
    update(cache, { data: { registerClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, registerClient],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.phone) {
      return alert("fill all fields");
    }
    registerClient(state.name, state.email, state.phone);
    updateState({
      name: "",
      email: "",
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
      >
        <div className="d-flex gap-2 align-items-center">
          <FaUser />
          <div>Add Client</div>
        </div>
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
