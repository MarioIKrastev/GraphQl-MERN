import { useNavigate } from "react-router-dom";
import { GET_USERPROJECTS } from "../../../queries/projects";
import { DELETE_PROJECT } from "../../../mutations/projectMutation";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";

export default function DeleteProject({ projectId, isPage = false }) {
  const cookie = new Cookies();
  const token = jwt_decode(cookie.get("Authorization").split("=")[1]);
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      return isPage ? navigate("/dashboard") : null;
    },
    refetchQueries: [{ query: GET_USERPROJECTS, variables: { id: token.id } }],
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
