import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainNavigation from "./navigation/MainNavigation";
import { ApolloProvider } from "react-apollo";
import defaultClient from "./Apollo/client";

export default function App() {
  return (
    <ApolloProvider client={defaultClient}>
      <MainNavigation />
    </ApolloProvider>
  );
}
