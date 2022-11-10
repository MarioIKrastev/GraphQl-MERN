export default function ProjectCard({ project }) {
    const status =
        project.status === "Completed" ? "text-success" : "text-danger";
    return (
        <div className="col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{project.name}</h5>
                        <a
                            className="btn btn-dark"
                            href={`/project/${project.id}`}
                        >
                            View
                        </a>
                        <p className="small">
                            Status:
                            <p className={`fw-bold ${status}`}>
                                {project.status}
                            </p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
