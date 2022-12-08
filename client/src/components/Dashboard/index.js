import { GET_CLIENT } from "../../queries/client";
import { useQuery } from "@apollo/client";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";

import ProjectCard from "../ProjectCard";
import Spinner from "../Spinner";
import { useCallback } from "react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [projects, setProjects] = useState(null);
  const cookie = new Cookies();
  const userId = jwt_decode(cookie.get("Authorization").split("=")[1]);

  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: {
      id: userId.id,
    },
  });
  if (loading) return <Spinner />;
  console.log(data.client.projects);
  // const memoize = useCallback(async () => {
  //   setProjects(data.projects);
  // }, [data.projects]);

  // useEffect(() => {
  //   memoize();
  // }, [memoize]);

  return (
    <>
      {data && data.client.projects.length !== 0 ? (
        data.client.projects.map((project) => (
          <div className="container d-flex direction-column">
            <ProjectCard key={project.id} project={project} />
          </div>
        ))
      ) : (
        <div className="container d-flex direction-column">
          <div className="pt-3 d-flex justify-content-center align-items-center w-100">
            <p className="text-dark fs-1 fw-bold text-info">
              There is No Projects
            </p>
          </div>
        </div>
      )}
    </>
    // <h1>das</h1>
  );
}
