import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import axios from "axios";
import jwt_decode from "jwt-decode";

import { Cookies } from "react-cookie";
import { login } from "../../slices/authSlice";
import { clientInfo } from "../../slices/clientSlice";
import { FaCheese } from "react-icons/fa";
import { Box, Button, Modal, TextField, useTheme } from "@mui/material";

export default function SignIn() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);
  const isSignedIn = localStorage.getItem("SignedIn");
  const cookies = new Cookies();
  const initState = {
    email: "",
    password: "",
  };
  const [state, updateState] = useReducer(
    (prev, curr) => ({ ...prev, ...curr }),
    initState
  );

  if (isSignedIn === "true") {
    return <Navigate to="/" />;
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email: state.email,
        password: state.password,
      });
      const token = response.data.token;
      const { id, name, email, phone } = jwt_decode(token);
      console.log(name, phone);
      localStorage.setItem("SignedIn", true);
      cookies.set("Authorization", `Bearer=${token}`);
      // dispatch(
      //   login({
      //     id,
      //     name,
      //     email,
      //   })
      // );
      dispatch(
        clientInfo({
          id,
          name,
          email,
          phone,
        })
      );
      navigation("/dashboard");
    } catch (error) {
      console.log(error);
    }
    updateState({
      email: "",
      password: "",
    });
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
        <p style={{ margin: 0 }}>Sign In</p>
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
              Sign In
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
                id="email"
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
                type="password"
                label="Password"
                variant="outlined"
                sx={{ mb: 3 }}
                value={state.password}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  updateState({
                    password: e.target.value,
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
