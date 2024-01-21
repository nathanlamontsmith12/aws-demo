import React from "react";
import ReactDOM from "react-dom/client";
import { 
    ApolloClient, 
    ApolloLink, 
    InMemoryCache, 
    ApolloProvider 
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { App } from "./App.jsx";

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors){
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
        return forward(operation);
    }
    
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        return forward(operation);
    }
});

const fileUploadLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: {
        "Apollo-Require-Preflight": true,
        "Access-Control-Allow-Credentials": true
    }
});

const client = new ApolloClient({
    link: ApolloLink.from([
        errorLink,
        fileUploadLink 
    ]),
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);