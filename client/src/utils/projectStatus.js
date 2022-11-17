export const projectStatus = (status) => {
    if (status === "Completed") return "text-success";
    if (status === "In Progress") return "text-warning";
    if (status === "Not Started") return "text-danger";
};
export const borderColor = (status) => {
    if (status === "Completed") return "border border-success";
    if (status === "In Progress") return "border border-warning";
    if (status === "Not Started") return "border border-danger";
};
