import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://localhost:8080/graphql'
});

export default client;
