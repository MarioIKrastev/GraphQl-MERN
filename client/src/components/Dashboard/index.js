import { useQuery } from "@apollo/client";
import { GET_USERPROJECTS } from "../../queries/projects";
import FormProject from "../FormProject";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectCard from "../ProjectCard";
import Spinner from "../Spinner";

export default function Dashboard() {
  const id = useSelector((state) => state.client.id);
  const { loading, error, data } = useQuery(GET_USERPROJECTS, {
    variables: {
      id: id,
    },
  });
  if (!id) return <Navigate to="/" />;
  if (loading) return <Spinner />;

  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        <FormProject />
        {!loading && !error && data.userProjects.length !== 0 ? (
          data.userProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-dark fs-1 fw-bold text-info">
            There is No Projects
          </p>
        )}
      </div>
    </>
  );
}
