import React from "react";
import styled from "styled-components";
import logo from "../../assets/icon.png";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import Register from "./Register";
import PropTypes from "prop-types";

const Container = styled.View`
  flex: 1;
`;

const LogoBox = styled.View`
  margin-top: 45px;
  justify-content: center;
  align-items: center;
  flex: 3;
`;

const Bottom = styled.View`
  flex: 4;
  align-items: center;
`;

const Logo = styled.Image`
  height: 200px;
  width: 200px;
`;

const Block = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const InputBox = styled.View`
  margin-top: 8px;
  border-color: grey;
  border-width: 1.5px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  width: ${Layout.window.width - 60};
  height: 48px;
`;
const Input = styled.TextInput`
  flex: 1;
  width: ${Layout.window.width - 90};
`;

const Text = styled.Text`
  font-size: 16px;
  align-self: flex-start;
  letter-spacing: 1px;
`;
const Button = styled.TouchableOpacity`
  width: 180px;
  height: 50px;
  border-radius: 4px;
  margin-top: 90px;
  background-color: ${Colors.tintColor};
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  letter-spacing: 1px;
`;

const TextBox = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;
const BottomText = styled.Text`
  color: ${props => props.color};
  font-size: 14px;
  letter-spacing: 1px;
`;
const ToRegister = styled.TouchableOpacity``;

export default class Login extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      registerVisible: false
    };
  }
  _openRegister() {
    this.setState({ registerVisible: true });
  }
  _closeRegister = () => {
    this.setState({ registerVisible: false });
  };

  render() {
    const { registerVisible } = this.state;
    return (
      <>
        <Container>
          <LogoBox>
            <Logo source={logo} />
          </LogoBox>
          <Bottom>
            <Block>
              <Text>이메일</Text>
              <InputBox>
                <Input autoCapitalize={"none"} />
              </InputBox>
            </Block>
            <Block>
              <Text>비밀번호</Text>
              <InputBox>
                <Input secureTextEntry={true} />
              </InputBox>
            </Block>
            <Button onPress={() => alert("close login modal")}>
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
      </>
    );
  }
}
