import { useQuery } from "@apollo/client";
import { GET_USERPROJECTS } from "../../queries/projects";
import FormProjectCreate from "../FormProjectCreate";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from "../ProjectCard";
import Spinner from "../Spinner";
import { Container, Box, Grid } from "@mui/material";
import { projects } from "../../slices/projectsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.client.id);
  const { loading, error, data } = useQuery(GET_USERPROJECTS, {
    variables: {
      id: id,
    },
  });
  if (!id) return <Navigate to="/signin" />;
  if (loading) return <Spinner />;
  dispatch(
    projects({
      projects: data.userProjects,
    })
  );

  return (
    <Container>
      <Box
        sx={{ display: "flex", flexDirection: "row" }}
        justifyContent="space-around"
      >
        <FormProjectCreate />
        <FormProjectCreate />
        <FormProjectCreate />
      </Box>
      <Grid container spacing={2}>
        {!loading && !error && data.userProjects.length !== 0 ? (
          data.userProjects.map((project) => (
            <ProjectCard key={project.id} project={project} item={6} />
          ))
        ) : (
          <p className="text-dark fs-1 fw-bold text-info">
            There is No Projects
          </p>
        )}
      </Grid>
    </Container>
  );
}
