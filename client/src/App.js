import Header from "./components/Header";
import Clients from "./components/Clients";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

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
                    <Clients />
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
