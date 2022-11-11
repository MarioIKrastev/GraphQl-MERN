import { projectStatus } from "../../utils/projectStatus";

export default function ProjectCard({ project }) {
    return (
        <div className="col-md-6">
            <div className="card mb-3">
                <div className="card-body ">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                            <h5 className="card-title m-0">{project.name}</h5>
                            <a
                                className="btn btn-dark"
                                href={`/projects/${project.id}`}
                            >
                                View
                            </a>
                        </div>
                        <p className="small m-0">
                            Status:
                            <span
                                className={`ms-2 fw-bold ${projectStatus(
                                    project.status
                                )}`}
                            >
                                {project.status}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
