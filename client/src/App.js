import Header from "./components/Header";
import Clients from "./components/Clients";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const apoloClient = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <>
            <ApolloProvider client={apoloClient}>
                <Header />
                <div className="container">
                    <Clients />
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
