import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-backend-1-obp7.onrender.com/graphql", 
  cache: new InMemoryCache(),
});

export default client;
