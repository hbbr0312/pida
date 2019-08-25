import React from "react"
import styled from "styled-components"
import { withNavigation } from "react-navigation"
import { Ionicons } from "@expo/vector-icons"

const SettingsPresenter = ({ navigation }) => {
  const makeRow = (routeName, label) => {
    return (
      <Row
        onPress={() =>
          navigation.navigate({
            routeName: routeName,
            params: {}
          })
        }
      >
        <Text>{label}</Text>
        <Icon>
          <Ionicons name={"ios-arrow-forward"} color="black" size={20} />
        </Icon>
      </Row>
    )
  }
  return (
    <Container>
      <Header marginTop={0}>
        <Title>계정 정보</Title>
      </Header>
      {makeRow("MyInfo", "내 정보")}
      {makeRow("PayInfo", "결제 정보")}
      {makeRow("AddressInfo", "배송 정보")}
      <Header marginTop={30}>
        <Title>고객센터</Title>
      </Header>
      {makeRow("Notice", "공지사항")}
      {makeRow("FAQ", "FAQ")}
      {makeRow("AppInfo", "앱 정보")}
      <Header marginTop={30}>
        <Title>보안</Title>
      </Header>
      <Row onPress={() => alert("logout")}>
        <Text>로그아웃</Text>
      </Row>
      <Row
        onPress={() =>
          navigation.navigate({
            routeName: "MemberDelete",
            params: {}
          })
        }
      >
        <Text>회원탈퇴</Text>
      </Row>
    </Container>
  )
}
export default withNavigation(SettingsPresenter)

const Container = styled.View`
  justify-content: center;
  flex: 1;
`

const Header = styled.View`
  height: 50px;
  margin-left: 20px;
  justify-content: center;
  border-bottom-color: #c9c9c9;
  border-bottom-width: 0.3px;
  margin-top: ${props => props.marginTop};
`
const Title = styled.Text`
  font-weight: 500;
`

const Row = styled.TouchableOpacity`
  height: 50px;
  margin-left: 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: #c9c9c9;
  border-bottom-width: 0.3px;
`

const Text = styled.Text`
  flex: 1;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 200;
`
const Icon = styled.View`
  margin-right: 20px;
`
