import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clientSlice",
  initialState: {
    id: "",
    name: "",
    email: "",
    phone: "",
    isAuthorized: false,
  },
  reducers: {
    clientInfo(state, action) {
      console.log(action.payload);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.isAuthorized = action.payload.isAuthorized;
    },
  },
});

export default clientSlice;
export const { clientInfo } = clientSlice.actions;
