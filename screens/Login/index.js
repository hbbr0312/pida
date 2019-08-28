import React from "react"
import styled from "styled-components"
import logo from "../../assets/icon.png"
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"
import Register from "./Register"
import PropTypes from "prop-types"
import { getTokens } from "../../api"
import { TouchableWithoutFeedback, Keyboard } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      registerVisible: false,
      username: "",
      password: ""
    }
  }
  _openRegister() {
    this.setState({ registerVisible: true })
  }
  _closeRegister = () => {
    this.setState({ registerVisible: false })
  }

  _login = async () => {
    const { login } = this.props
    const { username, password } = this.state
    const success = await getTokens(username, password)
    login(success)
  }

  render() {
    const { username, password, registerVisible } = this.state
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container>
            <LogoBox>
              <Logo source={logo} />
            </LogoBox>
            <Bottom>
              <Block>
                <Text>이메일</Text>
                <InputBox>
                  <Input
                    autoCapitalize={"none"}
                    onChangeText={id => this.setState({ username: id })}
                    onSubmitEditing={() => {
                      this.pw.focus()
                    }}
                    value={username}
                  />
                </InputBox>
              </Block>
              <Block>
                <Text>비밀번호</Text>
                <InputBox>
                  <Input
                    secureTextEntry={true}
                    onChangeText={pw => this.setState({ password: pw })}
                    value={password}
                    ref={input => {
                      this.pw = input
                    }}
                  />
                </InputBox>
              </Block>
              <Button onPress={() => this._login()}>
                <ButtonText>로그인</ButtonText>
              </Button>
              <TextBox>
                <BottomText color={"black"}>아이디가 없으신가요? </BottomText>
                <ToRegister onPress={() => this._openRegister()}>
                  <BottomText color={Colors.tintColor}>회원가입</BottomText>
                </ToRegister>
              </TextBox>
            </Bottom>
            <Register
              visible={registerVisible}
              _closeRegister={this._closeRegister}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    )
  }
}

const Container = styled.View`
  flex: 1;
`

const LogoBox = styled.View`
  margin-top: 160px;
  justify-content: center;
  align-items: center;
  flex: 3;
`

const Bottom = styled.View`
  flex: 4;
  align-items: center;
`

const Logo = styled.Image`
  height: 200px;
  width: 200px;
`

const Block = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`

const InputBox = styled.View`
  margin-top: 8px;
  border-color: grey;
  border-width: 1.5px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  width: ${Layout.window.width - 60};
  height: 48px;
`
const Input = styled.TextInput`
  flex: 1;
  width: ${Layout.window.width - 90};
`

const Text = styled.Text`
  font-size: 16px;
  align-self: flex-start;
  letter-spacing: 1px;
`
const Button = styled.TouchableOpacity`
  width: 180px;
  height: 50px;
  border-radius: 4px;
  margin-top: 90px;
  background-color: ${Colors.tintColor};
  justify-content: center;
  align-items: center;
`
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  letter-spacing: 1px;
`

const TextBox = styled.View`
  flex-direction: row;
  margin-top: 20px;
`
const BottomText = styled.Text`
  color: ${props => props.color};
  font-size: 14px;
  letter-spacing: 1px;
`
const ToRegister = styled.TouchableOpacity``
