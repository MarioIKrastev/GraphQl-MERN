import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { EDIT_CLIENT } from "../../mutations/clientMutation";
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
import { useState, useReducer } from "react";

export default function Profile() {
  const theme = useTheme();
  const { id, name, email, phone } = useSelector((state) => state.client);
  const projects = useSelector((state) => state.projects);
  const whenDiscard = { id, name, email, phone };
  const [edit, setEdit] = useState(false);

  const [state, updateState] = useReducer(
    (prev, curr) => ({ ...prev, ...curr }),
    {
      id,
      name,
      email,
      phone,
    }
  );
  const open = () => setEdit(true);
  const close = () => {
    updateState({
      name: whenDiscard.name,
      email: whenDiscard.email,
      phone: whenDiscard.phone,
    });
    setEdit(false);
  };

  const [editClient] = useMutation(EDIT_CLIENT, {
    variables: {
      id: state.id,
      name: state.name,
      email: state.email,
      phone: state.phone,
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    editClient(state.name, state.email, state.phone);
    setEdit(false);
  };
  return (
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
              onSubmit={onSubmit}
            >
              <TextField
                sx={{ mb: 3 }}
                type="text"
                size="small"
                label="Name"
                margin="dense"
                value={state.name}
                disabled={edit ? false : true}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    name: e.target.value,
                  })
                }
              />
              <TextField
                sx={{ mb: 3 }}
                type="text"
                size="small"
                label="Email"
                value={state.email}
                disabled={edit ? false : true}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    email: e.target.value,
                  })
                }
              />
              <TextField
                sx={{ mb: 3 }}
                type="text"
                size="small"
                label="Phone"
                value={state.phone}
                disabled={edit ? false : true}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    phone: e.target.value,
                  })
                }
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {!edit && (
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      "&:hover": { backgroundColor: "primary.light" },
                    }}
                    onClick={!edit ? open : close}
                  >
                    <p style={{ color: "tertiary", margin: 0 }}>Edit</p>
                  </Button>
                )}
                {edit && (
                  <>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        "&:hover": { backgroundColor: "primary.light" },
                      }}
                    >
                      <p style={{ color: "tertiary", margin: 0 }}>Save</p>
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      sx={{
                        "&:hover": { backgroundColor: "primary.light" },
                      }}
                      onClick={close}
                    >
                      <p style={{ color: "tertiary", margin: 0 }}>Discard</p>
                    </Button>
                  </>
                )}
              </Box>
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
  );
}
