import { useNavigate } from "react-router-dom";
import { projectStatus } from "../../utils/projectStatus";
import { Box, Card, Grid, Badge, useTheme } from "@mui/material";
import { HiWrenchScrewdriver } from "react-icons/hi2";

export default function ProjectCard({ project, item }) {
  const theme = useTheme();
  const navigation = useNavigate();

  const clickHandler = () => {
    return navigation(`/dashboard/${project.id}`);
  };
  return (
    <Grid item xs={item}>
      <Card
        onClick={clickHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          p: 3,
          cursor: "pointer",
          "&:hover > span > *": {
            backgroundColor: theme.palette.primary.light,
          },
        }}
        elevation={3}
      >
        <Badge
          overlap="circular"
          badgeContent=""
          color={projectStatus(project.status)}
        >
          <HiWrenchScrewdriver
            style={{
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
              width: "200px",
              height: "200px",
              color: theme.palette.secondary.main,
            }}
          />
        </Badge>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{project.name}</h2>
        </Box>
      </Card>
    </Grid>
  );
}
