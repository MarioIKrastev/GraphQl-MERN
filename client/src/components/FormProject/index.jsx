import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { Cookies } from "react-cookie";
import { FaHistory } from "react-icons/fa";

import { useMutation } from "@apollo/client";
// import { GET_CLIENTS } from "../../queries/clients"; when admin role is implemented
import jwt_decode from "jwt-decode";
import { ADD_PROJECT } from "../../mutations/projectMutation";
import { GET_USERPROJECTS } from "../../queries/projects";

export default function FormProject() {
  const cookie = new Cookies();
  const { id } = jwt_decode(cookie.get("Authorization").split("=")[1]);
  const navigate = useNavigate();
  const initState = {
    name: "",
    description: "",
    status: "new",
  };
  const [state, updateState] = useReducer(
    (prev, curr) => ({ ...prev, ...curr }),
    initState
  );
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: state.name,
      description: state.description,
      status: state.status,
      clientId: id,
    },
    onCompleted: () => {
      return navigate("/dashboard");
    },
    refetchQueries: [{ query: GET_USERPROJECTS, variables: { id: id } }],
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state.name || !state.description) {
      return alert("fill all fields");
    }
    addProject(state.name, state.description, state.status, id);
    updateState({
      name: "",
      description: "",
      status: "new",
    });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-toggle="modal"
        data-target="#addProjectModal"
        style={{ width: "150px" }}
      >
        <div className="d-flex gap-2 align-items-center">
          <FaHistory />
          <div>Add Project</div>
        </div>
      </button>
      <div
        className="modal fade"
        id="addProjectModal"
        role="dialog"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                Add Project
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
                  onChange={(e) =>
                    updateState({
                      name: e.target.value,
                    })
                  }
                />
                <label className="form-label">Description</label>
                <textarea
                  id="description"
                  className="form-control mb-3"
                  rows="5"
                  value={state.description}
                  onChange={(e) =>
                    updateState({
                      description: e.target.value,
                    })
                  }
                />
                <label className="form-label">Status</label>
                <select
                  className="form-select mb-3"
                  id="status"
                  value={state.status}
                  onChange={(e) =>
                    updateState({
                      status: e.target.value,
                    })
                  }
                >
                  <option value="new">Not Started</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-secondary" type="submit">
                    Submit
                  </button>
                  <button
                    className="btn btn-primary"
                    data-dismiss="modal"
                    type="button"
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
