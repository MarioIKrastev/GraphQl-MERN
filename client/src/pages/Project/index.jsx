import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projects";
import Message from "../../components/Message";
import ClientInfo from "../../components/ClientInfo";
import { noClient } from "./demo";
import { borderColor, projectStatus } from "../../utils/projectStatus";
import DeleteProject from "../../components/buttons/DeleteProjectButton/DeleteProject";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  if (loading) return <Spinner />;
  if (error) return <Message path={`/projects/${id}`} />;
  return (
    <>
      {!loading && !error && (
        <div
          className={`mx-auto w-75 card p-5 ${borderColor(
            data.project.status
          )}`}
        >
          <Link
            to="/dashboard"
            className="btn btn-light d-inline ms-auto border border-secondary"
          >
            Go back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project status</h5>
          <p className={`lead fw-bold ${projectStatus(data.project.status)}`}>
            {data.project.status}
          </p>
          <ClientInfo client={data.project.client} data={noClient} />
          <DeleteProject projectId={id} isPage />
        </div>
      )}
    </>
  );
}
