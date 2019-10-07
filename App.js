import React from "react"
import MainNavigation from "./navigation/MainNavigation"
import { ApolloProvider } from "react-apollo"
import defaultClient from "./Apollo/client"
import Login from "./screens/Login"
import { islogin, logout } from "./api"
import { connect, Provider } from "react-redux"
import { createStore } from "redux"
import reducer from "./reducers"
import { login_, logout_ } from "./actions"

class SApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logined: false
    }
  }

  login = success => {
    if (success) this.props.login_()
    else this.props.logout_()
  }

  componentDidMount = async () => {
    const logined = await islogin()
    this.setState({ logined })
  }

  render = () => {
    const logined = this.state
    if (this.props.login.login && logined)
      return (
        <ApolloProvider client={defaultClient}>
          <MainNavigation />
        </ApolloProvider>
      )
    else return <Login login={this.login} />
  }
}

let mapStateToProps = state => {
  return {
    login: state
  }
}

let mapDispatchToProps = dispatch => {
  return {
    login_: () => dispatch(login_()),
    logout_: () => dispatch(logout_())
  }
}
SApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SApp)

const store = createStore(reducer)

const App = () => {
  return (
    <Provider store={store}>
      <SApp />
    </Provider>
  )
}

export default App
