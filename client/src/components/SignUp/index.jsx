import { Box, Button, Modal, TextField, useTheme } from "@mui/material";
import axios from "axios";

import { useReducer, useState } from "react";
import { FaCheese } from "react-icons/fa";
import { Router } from "react-router-dom";

export default function SignUp() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);
  const initState = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };
  const [state, updateState] = useReducer(
    (prev, curr) => ({ ...prev, ...curr }),
    initState
  );

  const data = {
    name: state.name,
    email: state.email,
    password: state.password,
    phone: state.phone,
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", data);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
    updateState({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
    closeHandler();
  };
  return (
    <>
      <Button
        type="button"
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          "&:hover": { backgroundColor: "primary.light" },
        }}
        onClick={openHandler}
      >
        <p style={{ margin: 0 }}>Sign Up</p>
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
              Sign Up
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
                id="email"
                type="text"
                label="Email"
                variant="outlined"
                value={state.email}
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    email: e.target.value,
                  })
                }
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={state.password}
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    password: e.target.value,
                  })
                }
              />
              <TextField
                id="phone"
                type="text"
                label="Phone"
                variant="outlined"
                value={state.phone}
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    phone: e.target.value,
                  })
                }
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
                <Button type="button" variant="outlined" onClick={closeHandler}>
                  Close
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
