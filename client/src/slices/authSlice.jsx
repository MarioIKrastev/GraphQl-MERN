import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    id: "",
    name: "",
    email: "",
  },
  reducers: {
    login(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout(state) {
      state.id = "";
      state.name = "";
      state.email = "";
    },
  },
});
export default authSlice;
export const { login, logout } = authSlice.actions;
