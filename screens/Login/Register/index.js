import React from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import PropTypes from "prop-types";
import styled from "styled-components";
import Colors from "../../../constants/Colors";
import { Modal } from "react-native";
import { register } from "../../../api";

const Container = styled.View`
  flex: 1;
`;

const Top = styled.View`
  flex: 1.7;
  align-items: center;
`;
const Content = styled.View`
  flex: 7;
`;
const Title = styled.Text`
  margin-top: 70px;
  font-size: 25px;
  letter-spacing: 1px;
`;

const Bar = styled.View`
  margin-top: 35px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StepBar = styled.View`
  margin-left: 6px;
  margin-right: 6px;
  width: 50px;
  height: 6px;
  border-radius: 3px;
  background-color: ${props =>
    props.focused ? Colors.tintColor : Colors.invalidButton};
`;

export default class Register extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    _closeRegister: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      username: "",
      password: "",
      gender: null,
      age: null,
      skin_type: null,
      skin_concerns: [],
      allergies: []
    };
  }

  _goNext = async info => {
    const { step } = this.state;
    if (step < 3) this.setState(Object.assign({ step: step + 1 }, info));
    else if (step === 3) {
      const { username, password, gender, age } = this.state;
      const userinfo = Object.assign({ username, password, gender, age }, info);
      const { _closeRegister } = this.props;
      let response;
      let that = this;

      try {
        response = await register(userinfo);
      } catch (err) {
        console.log(err);
      } finally {
        if (response.ok) {
          that.setState({
            step: 1,
            username: "",
            password: "",
            gender: null,
            age: null,
            skin_type: null,
            skin_concerns: [],
            allergies: []
          });
          _closeRegister();
        } else {
          alert("cannot register");
          console.log("status", response.status);
        }
      }
    } else {
      alert("invalid!");
    }
  };

  render() {
    const {
      step,
      username,
      password,
      gender,
      age,
      skin_type,
      skin_concerns,
      allergies
    } = this.state;
    const { visible } = this.props;
    return (
      <Modal visible={visible} transparent={false}>
        <Container>
          <Top>
            <Title>
              {step === 1
                ? "피다의 회원이 되어주세요"
                : "회원 정보를 입력해 주세요"}
            </Title>
            <Bar>
              <StepBar focused={step === 1 ? true : false} />
              <StepBar focused={step === 2 ? true : false} />
              <StepBar focused={step === 3 ? true : false} />
            </Bar>
          </Top>
          <Content>
            {step === 1 ? (
              <Step1
                username={username}
                password={password}
                _goNext={this._goNext}
              />
            ) : null}
            {step === 2 ? (
              <Step2 gender={gender} age={age} _goNext={this._goNext} />
            ) : null}
            {step === 3 ? (
              <Step3
                skin_type={skin_type}
                skin_concerns={skin_concerns}
                allergies={allergies}
                _goNext={this._goNext}
              />
            ) : null}
          </Content>
        </Container>
      </Modal>
    );
  }
}
