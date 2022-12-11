import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USERPROJECTS } from "../../queries/projects";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import FormProject from "../FormProject";

import ProjectCard from "../ProjectCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Authorization").split("=")[1];
  const user = jwt_decode(token);

  const { loading, error, data } = useQuery(GET_USERPROJECTS, {
    variables: {
      id: user.id,
    },
  });
  if (!user && token === undefined) return navigate("/");
  return (
    <>
      {!loading && !error && data.userProjects.length !== 0 ? (
        data.userProjects.map((project) => (
          <div className="container d-flex flex-column" key={project.id}>
            <ProjectCard key={project.id} project={project} />
          </div>
        ))
      ) : (
        <div className="container d-flex flex-column align-items-center">
          <div className="pt-3 d-flex justify-content-center align-items-center w-100">
            <p className="text-dark fs-1 fw-bold text-info">
              There is No Projects
            </p>
          </div>
          <FormProject />
        </div>
      )}
    </>
  );
}
