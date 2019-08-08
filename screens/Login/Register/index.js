import React from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import PropTypes from "prop-types";
import styled from "styled-components";
import Colors from "../../../constants/Colors";
import { Modal } from "react-native";

const Container = styled.View`
  flex: 1;
`;

const Top = styled.View`
  flex: 1.7;
  align-items: center;
`;
const Content = styled.View`
  flex: 5.5;
`;
const Bottom = styled.View`
  flex: 1.5;
  align-items: center;
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

const Next = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 50px;
  border-radius: 4px;
  background-color: ${props =>
    props.valid ? Colors.tintColor : Colors.invalidButton};
`;

const ButtonText = styled.Text`
  color: ${props => (props.valid ? "white" : Colors.invalidButtonText)};
  font-size: 16px;
  letter-spacing: 1px;
`;

export default class Register extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      visible: props.visible,
      valid: [false, false, false],
      username: "",
      password: "",
      gender: null,
      age: null,
      skin_type: null,
      skin_concerns: [],
      allergies: []
    };
  }

  _update = value => {
    console.log("update");
    this.setState(value);
  };

  _goNext = () => {
    const { step, valid } = this.state;
    if (step < 3 && valid[step - 1]) this.setState({ step: step + 1 });
    else if (step === 3 && valid[2]) {
      //register
      this.setState({ step: 1, valid: [false, false, false] });
    } else {
      alert("invalid!");
    }
  };

  render() {
    const {
      visible,
      step,
      valid,
      username,
      password,
      gender,
      age,
      skin_type,
      skin_concerns,
      allergies
    } = this.state;
    console.log(username);
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
                _update={this._update}
              />
            ) : null}
            {step === 2 ? <Step2 gender={gender} age={age} /> : null}
            {step === 3 ? (
              <Step3
                skin_type={skin_type}
                skin_concerns={skin_concerns}
                allergies={allergies}
              />
            ) : null}
          </Content>
          <Bottom>
            <Next valid={valid[step - 1]} onPress={this._goNext}>
              <ButtonText valid={valid}>
                {step === 3 ? "다음" : "완료"}
              </ButtonText>
            </Next>
          </Bottom>
        </Container>
      </Modal>
    );
  }
}
