export const projectStatus = (status) => {
    if (status === "Completed") return "text-success";
    if (status === "In Progress") return "text-warning";
    if (status === "Not Started") return "text-danger";
};
