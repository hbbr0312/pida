import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import gql from "graphql-tag";

const restLink = new RestLink({
  uri: "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/"
});

const defaultClient = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export default defaultClient;

// client.query({ query }).then(response => {
//   console.log(response.data);
// });
