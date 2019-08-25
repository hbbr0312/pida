import React from "react"
import styled from "styled-components"
import logo from "../../../assets/icon.png"
import PropTypes from "prop-types"

const AppInfo = () => {
  return (
    <Container>
      <Logo source={logo} />
      <Text>피다</Text>
    </Container>
  )
}

AppInfo.propTypes = {}

AppInfo.navigationOptions = () => {
  return {
    title: "앱 정보"
  }
}

const Container = styled.View`
  border-top-color: #c9c9c9;
  border-top-width: 0.3px;
  align-items: center;
  justify-content: center;
  flex: 1;
`
const Logo = styled.Image`
  height: 100px;
  width: 100px;
`

const Text = styled.Text`
  margin-top: 30px;
  color: grey;
`

export default AppInfo
