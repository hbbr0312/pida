import React from "react"
import styled from "styled-components"
import Layout from "../../../constants/Layout"
import PropTypes from "prop-types"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../../../constants/Colors"
import { Content, ButtonContainer, Next, ButtonText } from "./styled"
import { checkDuplicateId } from "../../../api"

//이메일, 비밀번호, 비밀번호 확인
// username
// password

const Block = styled.View`
  align-self: center;
  width: ${Layout.window.width - 60};
  margin-bottom: 25px;
`
const Top = styled.View`
  flex-direction: row;
  width: ${Layout.window.width - 90};
`
const Bottom = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`
const Title = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
`
const Notice = styled.Text`
  font-size: 14px;
  color: grey;
  flex: 1;
  text-align: right;
`

const InputBox = styled.View`
  width: ${Layout.window.width - 90};
  height: 48px;
  border-color: grey;
  border-width: 1.5px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`
const TextInput = styled.TextInput`
  flex: 1;
  width: ${Layout.window.width - 110};
`

const Circle = status => {
  switch (status) {
    case 0:
      return (
        <Ionicons
          name="ios-radio-button-off"
          style={{ marginLeft: 10 }}
          size={30}
          color={"grey"}
        />
      )
    case 1:
      return (
        <Ionicons
          name="ios-checkmark-circle"
          style={{ marginLeft: 10 }}
          size={30}
          color={Colors.tintColor}
        />
      )
    case -1:
      return (
        <Ionicons
          name="ios-close-circle"
          style={{ marginLeft: 10 }}
          size={30}
          color={"grey"}
        />
      )
  }
}

export default class Step1 extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    _goNext: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      password: props.password,
      usernameValid: 0,
      confirm: ""
    }
  }
  goNext = valid => {
    if (valid) {
      const { _goNext } = this.props
      const { username, password } = this.state
      const info = {
        username,
        password
      }
      _goNext(info)
    }
  }

  makeMessage = (validNum, code) => {
    if (code === 1) {
      //case: email
      if (validNum === 1) return "사용 가능한 이메일입니다"
      else if (validNum === -1) return "이미 가입된 이메일입니다"
      else ""
    } else if (code === 2) {
      //case: password
      if (validNum === 1) return "사용 가능한 비밀번호입니다"
      else if (validNum === -1) return "사용 불가능한 비밀번호입니다"
      else ""
    } else {
      //case: password confirm
      if (validNum === 0) return ""
      else if (validNum === -1) return "비밀번호가 일치하지 않습니다"
      else return "비밀번호가 일치합니다"
    }
  }

  checkValidOfPw = pw => {
    const minLength = 4
    const maxLength = 12
    const needNumber = true
    const needSpecialChar = false
    const needCapital = false
    var special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (pw.length === 0) {
      return 0
    } else if (pw.length < minLength || pw.length > maxLength) {
      return -1
    } else if (needNumber && !/\d/.test(pw)) {
      return -1
    } else if (needSpecialChar && !special.test(pw)) {
      return -1
    } else if (needCapital && !/[A-Z]/.test(pw)) {
      return -1
    } else {
      return 1
    }
  }

  checkConfirm = (confirm, password) => {
    if (confirm === "") return 0
    else if (confirm === password) return 1
    else return -1
  }

  checkUsernameValid = async () => {
    const { username } = this.state
    console.log("end editing")
    const usernameValid = await checkDuplicateId(username)
    if (usernameValid) this.setState({ usernameValid: 1 })
    else this.setState({ usernameValid: -1 })
  }

  render() {
    const { username, password, confirm, usernameValid } = this.state
    const passwordValid = this.checkValidOfPw(password)
    const confirmValid = this.checkConfirm(confirm, password)
    const valid =
      usernameValid === 1 && passwordValid === 1 && confirmValid === 1

    return (
      <>
        <Content>
          <Block>
            <Top>
              <Title>이메일</Title>
              <Notice>{this.makeMessage(usernameValid, 1)}</Notice>
            </Top>
            <Bottom>
              <InputBox>
                <TextInput
                  onEndEditing={async () => this.checkUsernameValid()}
                  onChangeText={id =>
                    this.setState({ username: id, usernameValid: 0 })
                  }
                  value={username}
                  autoCapitalize={"none"}
                  keyboardType={"email-address"}
                />
              </InputBox>
              {Circle(usernameValid)}
            </Bottom>
          </Block>
          <Block>
            <Top>
              <Title>비밀번호</Title>
              <Notice>{this.makeMessage(passwordValid, 2)}</Notice>
            </Top>
            <Bottom>
              <InputBox>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={pw => this.setState({ password: pw })}
                  value={password}
                />
              </InputBox>
              {Circle(passwordValid)}
            </Bottom>
          </Block>
          <Block>
            <Top>
              <Title>비밀번호 확인</Title>
              <Notice>{this.makeMessage(confirmValid, 3)}</Notice>
            </Top>
            <Bottom>
              <InputBox>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={pw => {
                    this.setState({ confirm: pw })
                  }}
                  value={confirm}
                />
              </InputBox>
              {Circle(confirmValid)}
            </Bottom>
          </Block>
        </Content>
        <ButtonContainer>
          <Next valid={valid} onPress={() => this.goNext(valid)}>
            <ButtonText valid={valid}>다음</ButtonText>
          </Next>
        </ButtonContainer>
      </>
    )
  }
}
