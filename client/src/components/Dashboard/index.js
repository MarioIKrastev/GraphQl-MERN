import { GET_PROJECTS } from "../../queries/projects";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { id, name, email } = useSelector((state) => state.auth);
  return (
    <div className="d-flex direction-column">
      <h1>{id}</h1>
      <h3>{name}</h3>
      <h2>{email}</h2>
    </div>
  );
}
