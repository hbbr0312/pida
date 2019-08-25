import React from "react"
import MainNavigation from "./navigation/MainNavigation"
import { ApolloProvider } from "react-apollo"
import defaultClient from "./Apollo/client"
import Login from "./screens/Login"
import { islogin, logout } from "./api"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logined: false
    }
  }
  componentDidMount = async () => {
    const logined = await islogin()
    this.setState({ logined })
  }

  login = logined => {
    this.setState({ logined })
  }
  render() {
    const { logined } = this.state
    if (logined)
      return (
        <ApolloProvider client={defaultClient}>
          <MainNavigation />
        </ApolloProvider>
      )
    else return <Login login={this.login} />
  }
}
