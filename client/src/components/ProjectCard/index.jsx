import { Link } from "react-router-dom";
import { GET_USERPROJECTS } from "../../queries/projects";
import { projectStatus } from "../../utils/projectStatus";
import DeleteProject from "../buttons/DeleteProjectButton/DeleteProject";

export default function ProjectCard({ project }) {
  return (
    <div className="col-md-6 p-0">
      <div className="card mb-3">
        <div className="card-body ">
          <div className="d-flex gap-3 align-items-center flex-column">
            <div className="w-100 d-flex gap-3 justify-content-between">
              <h5 className="card-title m-0" style={{ maxWidth: "15rem" }}>
                {project.name}
              </h5>
              <p className="small m-0">
                Status:
                <span
                  className={`ms-2 fw-bold ${projectStatus(project.status)}`}
                >
                  {project.status}
                </span>
              </p>
            </div>
            <div className="w-100 d-flex gap-2 justify-content-end">
              <Link
                className="btn btn-light border border-primary"
                to={`/dashboard/${project.id}`}
              >
                View
              </Link>
              <DeleteProject projectId={project.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
