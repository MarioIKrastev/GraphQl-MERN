import { ApolloProvider, ApolloClient } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { cache } from "./utils/cache";

import Home from "./pages/Home";
import NotFound from "./pages/404";
import Layout from "./components/Layout";
import Project from "./pages/Project";

import SignUp from "./components/SignUp";
import SignInForm from "./components/SignInForm";
import SignOut from "./components/SignOut";
import Projects from "./pages/Projects";
import Dashboard from "./components/Dashboard";

const apoloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});
function App() {
  return (
    <>
      <ApolloProvider client={apoloClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignInForm />} />
              <Route path="signout" element={<SignOut />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
