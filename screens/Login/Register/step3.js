import React from "react"
import styled from "styled-components"
import { Ionicons } from "@expo/vector-icons"
import PropTypes from "prop-types"
import Colors from "../../../constants/Colors"
import { Content, ButtonContainer, Next, ButtonText, Back } from "./styled"

// skin_type 0~3
// skin_concerns a~h
// allergies a~f

const Box = styled.View`
  margin-bottom: 20px;
`
const Title = styled.Text`
  font-size: 16px;
  margin-left: 30px;
  letter-spacing: 1px;
  margin-bottom: 10px;
  font-weight: 500;
`
const Column = styled.View`
  margin-left: 30px;
  width: 100px;
  margin-left: 30px;
`
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`
const Item = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  margin-bottom: 5px;
  height: 40px;
`
const Text = styled.Text`
  margin-left: 10px;
  font-size: 14px;
`

const Radio = on => {
  if (on) {
    return (
      <Ionicons
        name={"ios-radio-button-on"}
        size={30}
        color={Colors.tintColor}
      />
    )
  } else
    return <Ionicons name={"ios-radio-button-off"} size={30} color="grey" />
}

const CheckBox = on => {
  if (on) {
    return <Ionicons name={"ios-checkbox"} size={30} color={Colors.tintColor} />
  } else return <Ionicons name={"ios-square-outline"} size={35} color="grey" />
}

export default class Step3 extends React.Component {
  static propTypes = {
    skin_type: PropTypes.number,
    skin_concerns: PropTypes.array.isRequired,
    allergies: PropTypes.array.isRequired,
    _goNext: PropTypes.func.isRequired,
    _goBack: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      skin_type: props.skin_type,
      skin_concerns: props.skin_concerns,
      allergies: props.allergies
    }
  }

  _handleConcern = concern => {
    const { skin_concerns } = this.state
    if (!skin_concerns.includes(concern)) {
      skin_concerns.push(concern)
      this.setState({ skin_concerns })
    } else {
      const index = skin_concerns.indexOf(concern)
      skin_concerns.splice(index, 1)
      this.setState({ skin_concerns })
    }
  }

  _handleAllergy = allergy => {
    const { allergies } = this.state
    if (allergies.includes(allergy)) {
      const index = allergies.indexOf(allergy)
      allergies.splice(index, 1)
      this.setState({ allergies })
    } else {
      if (allergy === "f") {
        this.setState({ allergies: ["f"] })
      } else {
        allergies.push(allergy)
        if (allergies.includes("f")) {
          const index = allergies.indexOf("f")
          allergies.splice(index, 1)
        }
        this.setState({ allergies })
      }
    }
  }

  goNext = valid => {
    if (valid) {
      const { _goNext } = this.props
      const { skin_type, skin_concerns, allergies } = this.state
      var index = allergies.indexOf("f")
      if (index > -1) {
        allergies.splice(index, 1)
      }
      const info = {
        skin_type,
        skin_concerns,
        allergies
      }
      _goNext(info)
    }
  }

  render() {
    const { skin_type, skin_concerns, allergies } = this.state
    const { _goBack } = this.props
    const valid = skin_type !== null && allergies.length > 0
    return (
      <>
        <Content>
          <Box>
            <Title>피부 타입</Title>
            <Row>
              <Column>
                <Item onPress={() => this.setState({ skin_type: 0 })}>
                  {Radio(skin_type === 0)}
                  <Text>건성</Text>
                </Item>
                <Item onPress={() => this.setState({ skin_type: 2 })}>
                  {Radio(skin_type === 2)}
                  <Text>지성</Text>
                </Item>
              </Column>
              <Column>
                <Item onPress={() => this.setState({ skin_type: 1 })}>
                  {Radio(skin_type === 1)}
                  <Text>중성</Text>
                </Item>
                <Item onPress={() => this.setState({ skin_type: 3 })}>
                  {Radio(skin_type === 3)}
                  <Text>복합</Text>
                </Item>
              </Column>
            </Row>
          </Box>
          <Box>
            <Title>피부 고민</Title>
            <Row>
              <Column>
                <Item onPress={() => this._handleConcern("a")}>
                  {CheckBox(skin_concerns.includes("a"))}
                  <Text>여드름</Text>
                </Item>
                <Item onPress={() => this._handleConcern("c")}>
                  {CheckBox(skin_concerns.includes("c"))}
                  <Text>홍조</Text>
                </Item>
                <Item onPress={() => this._handleConcern("e")}>
                  {CheckBox(skin_concerns.includes("e"))}
                  <Text>미백</Text>
                </Item>
                <Item onPress={() => this._handleConcern("g")}>
                  {CheckBox(skin_concerns.includes("g"))}
                  <Text>SPF 지수</Text>
                </Item>
              </Column>
              <Column>
                <Item onPress={() => this._handleConcern("b")}>
                  {CheckBox(skin_concerns.includes("b"))}
                  <Text>블랙헤드</Text>
                </Item>
                <Item onPress={() => this._handleConcern("d")}>
                  {CheckBox(skin_concerns.includes("d"))}
                  <Text>탄력</Text>
                </Item>
                <Item onPress={() => this._handleConcern("f")}>
                  {CheckBox(skin_concerns.includes("f"))}
                  <Text>미세먼지</Text>
                </Item>
                <Item onPress={() => this._handleConcern("h")}>
                  {CheckBox(skin_concerns.includes("h"))}
                  <Text>기타</Text>
                </Item>
              </Column>
            </Row>
          </Box>
          <Box>
            <Title>알러지</Title>
            <Row>
              <Column>
                <Item onPress={() => this._handleAllergy("a")}>
                  {CheckBox(allergies.includes("a"))}
                  <Text>땅콩</Text>
                </Item>
                <Item onPress={() => this._handleAllergy("c")}>
                  {CheckBox(allergies.includes("c"))}
                  <Text>천연 추출물</Text>
                </Item>
                <Item onPress={() => this._handleAllergy("e")}>
                  {CheckBox(allergies.includes("e"))}
                  <Text>기타</Text>
                </Item>
              </Column>
              <Column>
                <Item onPress={() => this._handleAllergy("b")}>
                  {CheckBox(allergies.includes("b"))}
                  <Text>알콜</Text>
                </Item>
                <Item onPress={() => this._handleAllergy("d")}>
                  {CheckBox(allergies.includes("d"))}
                  <Text>향</Text>
                </Item>
                <Item onPress={() => this._handleAllergy("f")}>
                  {CheckBox(allergies.includes("f"))}
                  <Text>없음</Text>
                </Item>
              </Column>
            </Row>
          </Box>
        </Content>
        <ButtonContainer>
          <Back
            onPress={() => _goBack({ skin_type, skin_concerns, allergies })}
          >
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
