import React from "react"
import styled from "styled-components"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../../../constants/Colors"
import PropTypes from "prop-types"
import { Content, ButtonContainer, Next, ButtonText, Back } from "./styled"

//gender
//age

const Box = styled.View`
  margin-left: 30px;
  margin-bottom: 20px;
`
const Title = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: 10px;
`
const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
`
const Text = styled.Text`
  margin-left: 10px;
  font-size: 14px;
`

const Radio = (on = false) => {
  if (on)
    return (
      <Ionicons
        name={"ios-radio-button-on"}
        size={30}
        color={Colors.tintColor}
      />
    )
  else return <Ionicons name={"ios-radio-button-off"} size={30} color="grey" />
}

export default class Step2 extends React.Component {
  static propTypes = {
    gender: PropTypes.number,
    age: PropTypes.number,
    _goNext: PropTypes.func.isRequired,
    _goBack: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      gender: props.gender,
      age: props.age
    }
  }

  goNext = valid => {
    if (valid) {
      const { _goNext } = this.props
      const { gender, age } = this.state
      const info = {
        gender,
        age
      }
      _goNext(info)
    }
  }

  render() {
    const { gender, age } = this.state
    const { _goBack } = this.props
    const valid = gender !== null && age !== null
    return (
      <>
        <Content>
          <Box>
            <Title>성별</Title>
            <Row onPress={() => this.setState({ gender: 0 })}>
              {Radio(gender === 0)}
              <Text>여성</Text>
            </Row>
            <Row onPress={() => this.setState({ gender: 1 })}>
              {Radio(gender === 1)}
              <Text>남성</Text>
            </Row>
          </Box>
          <Box>
            <Title>나이</Title>
            <Row onPress={() => this.setState({ age: 0 })}>
              {Radio(age === 0)}
              <Text>19세 이하</Text>
            </Row>
            <Row onPress={() => this.setState({ age: 1 })}>
              {Radio(age === 1)}
              <Text>20 ~ 26세</Text>
            </Row>
            <Row onPress={() => this.setState({ age: 2 })}>
              {Radio(age === 2)}
              <Text>27 ~ 36세</Text>
            </Row>
            <Row onPress={() => this.setState({ age: 3 })}>
              {Radio(age === 3)}
              <Text>37 ~ 50세</Text>
            </Row>
            <Row onPress={() => this.setState({ age: 4 })}>
              {Radio(age === 4)}
              <Text>51세 이상</Text>
            </Row>
          </Box>
        </Content>
        <ButtonContainer>
          <Back onPress={() => _goBack({ gender, age })}>
            <ButtonText valid={true}>뒤로</ButtonText>
          </Back>
          <Next valid={valid} onPress={() => this.goNext(valid)}>
            <ButtonText valid={valid}>다음</ButtonText>
          </Next>
        </ButtonContainer>
      </>
    )
  }
}
