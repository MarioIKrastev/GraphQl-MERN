import Spinner from "../Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/projects";
import ProjectCard from "../ProjectCard";
import Message from "../Message";

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />;
    if (error) return <Message />;
    return (
        <>
            {data.projects.length > 0 ? (
                <div className="gap-1 row mb-5 border p-3">
                    {data.projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="d-flex mb-5 align-items-center justify-content-center border">
                    <p className="m-0 text-uppercase fs-1 fw-bold p-5">
                        No Available Projects
                    </p>
                </div>
            )}
        </>
    );
}
