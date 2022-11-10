import Header from "./components/Header";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import Form from "./components/Form";
import { ApolloProvider, ApolloClient } from "@apollo/client";
import { cache } from "./utils/cache";

const apoloClient = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache,
});

function App() {
    return (
        <>
            <ApolloProvider client={apoloClient}>
                <Header />
                <div className="container">
                    <Form />
                    <Projects />
                    <Clients />
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
