import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projects(state, action) {
      state.projects = action.payload.projects;
    },
  },
});

export default projectsSlice;
export const { projects } = projectsSlice.actions;
