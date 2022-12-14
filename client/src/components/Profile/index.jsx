import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CLIENT } from "../../queries/client";
import { useSelector } from "react-redux";
import {
  useTheme,
  Box,
  TextField,
  Button,
  Container,
  Card,
  Grid,
} from "@mui/material";
import ProjectCard from "../ProjectCard";

export default function Profile() {
  const projects = useSelector((state) => state.projects);
  const id = useSelector((state) => state.client.id);
  const theme = useTheme();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: {
      id: id,
    },
  });
  return (
    <>
      {!loading && !error && (
        <Container>
          <Box sx={{ mt: 6, display: "flex", gap: 1, maxHeight: "36rem" }}>
            <Card sx={{ flex: 1 }} variant="outlined">
              <Box
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  margin: "0 auto",
                }}
              >
                <FaUser
                  className="p-3"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.light,
                    width: "200px",
                    height: "200px",
                    color: theme.palette.tertiary.main,
                  }}
                />
                <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <TextField
                    sx={{ mb: 3 }}
                    type="text"
                    size="small"
                    label="Name"
                    margin="dense"
                    value={data.client.name}
                    disabled
                  />
                  <TextField
                    sx={{ mb: 3 }}
                    type="text"
                    size="small"
                    label="Email"
                    value={data.client.email}
                    disabled
                  />
                  <TextField
                    sx={{ mb: 3 }}
                    type="text"
                    size="small"
                    label="Phone"
                    value={data.client.phone}
                    disabled
                  />
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      "&:hover": { backgroundColor: "primary.light" },
                    }}
                    onClick={() => navigate("/profile/me")}
                  >
                    <p style={{ color: "tertiary", margin: 0 }}>Edit</p>
                  </Button>
                </Box>
              </Box>
            </Card>
            <Card
              sx={{
                flex: 2,
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
              }}
              variant="outlined"
            >
              <Grid
                container
                spacing={3}
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {projects.length !== 0 ? (
                  projects.map((project) => (
                    <ProjectCard key={project.id} project={project} item={12} />
                  ))
                ) : (
                  <h2>No Projects</h2>
                )}
              </Grid>
            </Card>
          </Box>
        </Container>
      )}
    </>
  );
}
