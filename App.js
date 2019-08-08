import React from "react";
import MainNavigation from "./navigation/MainNavigation";
import { ApolloProvider } from "react-apollo";
import defaultClient from "./Apollo/client";
import Login from "./screens/Login";

export default function App() {
  return (
    <ApolloProvider client={defaultClient}>
      <MainNavigation />
      <Login logined={true} />
    </ApolloProvider>
  );
}
