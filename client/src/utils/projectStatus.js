export const projectStatus = (status) => {
  if (status === "Completed") return "success";
  if (status === "In Progress") return "info";
  if (status === "Not Started") return "error";
};
export const borderColor = (status) => {
  if (status === "Completed") return "border border-success";
  if (status === "In Progress") return "border border-warning";
  if (status === "Not Started") return "border border-danger";
};
