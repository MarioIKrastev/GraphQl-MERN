import { ApolloProvider, ApolloClient } from "@apollo/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { cache } from "./utils/cache";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Layout from "./components/Layout";
import Project from "./pages/Project";

import SignUp from "./components/SignUp";
import SignInForm from "./components/SignInForm";
import SignOut from "./components/SignOut";
import Dashboard from "./components/Dashboard";

const apoloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});
function App() {
  const isLoggedIn = localStorage.getItem("SignedIn");
  return (
    <>
      <ApolloProvider client={apoloClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="signup"
                element={isLoggedIn ? <Navigate to={"/"} /> : <SignUp />}
              />
              <Route
                path="signin"
                element={isLoggedIn ? <Navigate to={"/"} /> : <SignInForm />}
              />
              <Route path="signout" element={<SignOut />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/:id" element={<Project />} />
              {/* <Route path='profile/me' element={ !isLoggedIn ? <Navigate to={"/signin"} /> : <Profile />} /> */}
              {/* <Route path="projects" element={<Projects />} /> */}
              {/* <Route path="projects/:id" element={<Project />} /> */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
