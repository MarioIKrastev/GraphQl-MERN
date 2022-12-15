import { ApolloProvider, ApolloClient } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { cache } from "./utils/cache";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Layout from "./components/Layout";
import Project from "./pages/Project";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import ProfileEdit from "./components/Profile/edit";
const apoloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});
function App() {
  return (
    <>
      <ApolloProvider client={apoloClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="signout" element={<SignOut />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/:id" element={<Project />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/me" element={<ProfileEdit />} />
                {/* <Route path="projects" element={<Projects />} /> */}
                {/* <Route path="projects/:id" element={<Project />} /> */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
