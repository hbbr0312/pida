import React from "react"
import MainNavigation from "./navigation/MainNavigation"
import { ApolloProvider } from "react-apollo"
import defaultClient from "./Apollo/client"
import Login from "./screens/Login"
import { login } from "./api"

export default function App() {
  const logined = true
  //login({ username: "final", password: "1234" })
  if (logined)
    return (
      <ApolloProvider client={defaultClient}>
        <MainNavigation />
      </ApolloProvider>
    )
  else return <Login />
}