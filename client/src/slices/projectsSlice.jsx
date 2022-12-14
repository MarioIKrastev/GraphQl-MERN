import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: null,
  reducers: {
    projects(state, action) {
      return action.payload.projects;
    },
  },
});

export default projectsSlice;
export const { projects } = projectsSlice.actions;
