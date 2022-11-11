import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projects";
import Message from "../../components/Message";
import ClientInfo from "../../components/ClientInfo";
import { noClient } from "./demo";
import { projectStatus } from "../../utils/projectStatus";

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
                <div className="mx-auto w-75 card p-5">
                    <Link
                        to="/"
                        className="btn btn-light btn-sm w-25 d-inline ms-auto"
                    >
                        Go back
                    </Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>
                    <h5 className="mt-3">Project status</h5>
                    <p
                        className={`lead fw-bold ${projectStatus(
                            data.project.status
                        )}`}
                    >
                        {data.project.status}
                    </p>
                    <ClientInfo client={data.project.client} data={noClient} />
                </div>
            )}
        </>
    );
}
