import React from "react";
import styled from "styled-components";
import Layout from "../../../constants/Layout";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

//이메일, 비밀번호, 비밀번호 확인
// username
// password

const Block = styled.View`
  align-self: center;
  width: ${Layout.window.width - 60};
  margin-bottom: 25px;
`;
const Top = styled.View`
  flex-direction: row;
  width: ${Layout.window.width - 90};
`;
const Bottom = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
const Title = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
`;
const Notice = styled.Text`
  font-size: 14px;
  color: grey;
  flex: 1;
  text-align: right;
`;

const InputBox = styled.View`
  width: ${Layout.window.width - 90};
  height: 48px;
  border-color: grey;
  border-width: 1.5px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
const TextInput = styled.TextInput`
  flex: 1;
  width: ${Layout.window.width - 110};
`;

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
      );
    case 1:
      return (
        <Ionicons
          name="ios-checkmark-circle"
          style={{ marginLeft: 10 }}
          size={30}
          color={Colors.tintColor}
        />
      );
    case -1:
      return (
        <Ionicons
          name="ios-close-circle"
          style={{ marginLeft: 10 }}
          size={30}
          color={"grey"}
        />
      );
  }
};

export default class Step1 extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    _update: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      password: props.password,
      confirm: "",
      usernameValid: 0,
      passwordValid: 0
    };
  }
  render() {
    const { _update } = this.props;
    const {
      username,
      password,
      confirm,
      usernameValid,
      passwordValid
    } = this.state;
    return (
      <>
        <Block>
          <Top>
            <Title>이메일</Title>
            <Notice>이미 가입된 이메일입니다.</Notice>
          </Top>
          <Bottom>
            <InputBox>
              <TextInput
                onChangeText={id => this.setState({ username: id })}
                value={username}
              />
            </InputBox>
            {Circle(usernameValid)}
          </Bottom>
        </Block>
        <Block>
          <Top>
            <Title>비밀번호</Title>
            <Notice>사용 가능한 비밀번호입니다</Notice>
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
            <Notice>비밀번호가 일치하지 않습니다</Notice>
          </Top>
          <Bottom>
            <InputBox>
              <TextInput
                secureTextEntry={true}
                onChangeText={pw => {
                  this.setState({ confirm: pw });
                }}
                value={confirm}
              />
            </InputBox>
            {confirm === ""
              ? Circle(0)
              : confirm === password
              ? Circle(1)
              : Circle(-1)}
          </Bottom>
        </Block>
      </>
    );
  }
}
