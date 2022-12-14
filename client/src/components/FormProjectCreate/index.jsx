import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  useTheme,
} from "@mui/material";
import { Cookies } from "react-cookie";
import { FaHistory, FaCheese } from "react-icons/fa";

import { useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";
import { ADD_PROJECT } from "../../mutations/projectMutation";
import { GET_USERPROJECTS } from "../../queries/projects";

export default function FormProjectCreate() {
  const theme = useTheme();
  const cookie = new Cookies();
  const { id } = jwt_decode(cookie.get("Authorization").split("=")[1]);
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);

  const navigate = useNavigate();
  const initState = {
    name: "",
    description: "",
    status: "new",
  };
  const [state, updateState] = useReducer(
    (prev, curr) => ({ ...prev, ...curr }),
    initState
  );
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: state.name,
      description: state.description,
      status: state.status,
      clientId: id,
    },
    onCompleted: () => {
      return navigate("/dashboard");
    },
    refetchQueries: [{ query: GET_USERPROJECTS, variables: { id: id } }],
  });
  const submitHandler = (e) => {
    e.preventDefault();
    if (!state.name || !state.description) {
      return alert("fill all fields");
    }
    addProject(state.name, state.description, state.status, id);
    updateState({
      name: "",
      description: "",
      status: "new",
    });
    closeHandler();
  };
  return (
    <Box sx={{ mt: 6 }}>
      <Button
        type="button"
        variant="contained"
        sx={{
          display: "flex",
          gap: 2,
          aligItems: "center",
          py: 2,
          px: 4,
          mb: 8,
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
        onClick={openHandler}
      >
        <FaHistory />
        <p style={{ margin: 0, fontSize: 18 }}>Add Project</p>
      </Button>
      <Modal
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            background: theme.palette.tertiary.main,
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
              pb: 4,
            }}
          >
            <h4 className="modal-title" id="addProjectModalLabel">
              Add Project
            </h4>
            <Button type="button" variant="outlined" onClick={closeHandler}>
              <FaCheese />
            </Button>
          </Box>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="name"
                type="text"
                label="Name"
                variant="outlined"
                sx={{ mb: 3 }}
                value={state.name}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    name: e.target.value,
                  })
                }
              />
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                multiline
                minRows="5"
                value={state.description}
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    description: e.target.value,
                  })
                }
              />
              <TextField
                sx={{ mb: 3 }}
                select
                id="status"
                defaultValue={state.status}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    status: e.target.value,
                  })
                }
              >
                <MenuItem value="new">Not Started</MenuItem>
                <MenuItem value="progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
              <div className="d-flex justify-content-between">
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
                <Button type="button" variant="outlined" onClick={closeHandler}>
                  Close
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
