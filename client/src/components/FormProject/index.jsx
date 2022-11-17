import { useReducer } from "react";
import { FaHistory } from "react-icons/fa";
import { GET_CLIENTS } from "../../queries/clients";
import { ADD_PROJECT } from "../../mutations/projectMutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/projects";

export default function FormClient() {
    const initState = {
        name: "",
        description: "",
        status: "new",
        clientId: "",
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
            clientId: state.clientId,
        },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    //Get Clients for select menu
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!state.name || !state.description || !state.clientId) {
            return alert("fill all fields");
        }
        addProject(state.name, state.description, state.status, state.clientId);
        updateState({
            name: "",
            description: "",
            status: "new",
            clientId: "",
        });
    };
    return (
        <>
            {!error && !loading && (
                <>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#addProjectModal"
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
                                    <h5
                                        className="modal-title"
                                        id="addProjectModalLabel"
                                    >
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
                                        <label className="form-label">
                                            Name
                                        </label>
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
                                        <label className="form-label">
                                            Description
                                        </label>
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
                                        <label className="form-label">
                                            Status
                                        </label>
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
                                            <option value="new">
                                                Not Started
                                            </option>
                                            <option value="progress">
                                                In Progress
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                        </select>
                                        <label className="form-label">
                                            Client
                                        </label>
                                        <select
                                            id="clientId"
                                            className="form-select mb-5"
                                            value={state.clientId}
                                            onChange={(e) =>
                                                updateState({
                                                    clientId: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Select Client
                                            </option>
                                            {data.clients.map((client) => (
                                                <option
                                                    key={client.id}
                                                    value={client.id}
                                                >
                                                    {client.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="d-flex justify-content-between">
                                            <button
                                                className="btn btn-secondary "
                                                type="submit"
                                            >
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
            )}
        </>
    );
}
