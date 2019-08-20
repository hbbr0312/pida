import React from "react"
import styled from "styled-components"
import { withNavigation } from "react-navigation"
const SettingsPresenter = ({ navigation }) => {
  return (
    <>
      <Row
        onPress={() =>
          navigation.navigate({
            routeName: "MyInfo",
            params: {}
          })
        }
      >
        <Text>내 정보</Text>
      </Row>
    </>
  )
}
export default withNavigation(SettingsPresenter)

const Row = styled.TouchableOpacity`
  height: 100px;
  background-color: red;
  flex: 1;
`
const Text = styled.Text``
