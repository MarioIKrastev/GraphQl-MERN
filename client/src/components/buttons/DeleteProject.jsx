import { useParams, useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../../queries/projects";
import { DELETE_PROJECT } from "../../mutations/projectMutation";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";

export default function DeleteProject({ projectId }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => {
            return id ? navigate("/") : null;
        },
        refetchQueries: [{ query: GET_PROJECTS }],
    });
    return (
        <button
            className="d-flex ms-auto align-items-center gap-1 btn btn-light border border-danger"
            onClick={deleteProject}
        >
            <FaTrash />
            Delete
        </button>
    );
}
