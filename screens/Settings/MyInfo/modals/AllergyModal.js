import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Modal } from "react-native"
import Colors from "../../../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

export default class extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    allergies: PropTypes.array,
    _updateState: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      allergies: props.allergies
    }
  }
  renderIcon = (on = false) => {
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
  render() {
    const { visible, _updateState } = this.props
    const { allergies } = this.state
    return (
      <Modal visible={visible} transparent={true}>
        <Container>
          <View>
            <Header>
              <Title>피부 고민</Title>
            </Header>
            <Body>
              <Row onPress={() => this._handleAllergy("a")}>
                <Icon>{this.renderIcon(allergies.includes("a"))}</Icon>
                <Text>땅콩</Text>
              </Row>
              <Row onPress={() => this._handleAllergy("b")}>
                <Icon>{this.renderIcon(allergies.includes("b"))}</Icon>
                <Text>알콜</Text>
              </Row>
              <Row onPress={() => this._handleAllergy("c")}>
                <Icon>{this.renderIcon(allergies.includes("c"))}</Icon>
                <Text>천연추출물</Text>
              </Row>
              <Row onPress={() => this._handleAllergy("d")}>
                <Icon>{this.renderIcon(allergies.includes("d"))}</Icon>
                <Text>향</Text>
              </Row>
              <Row onPress={() => this._handleAllergy("e")}>
                <Icon>{this.renderIcon(allergies.includes("e"))}</Icon>
                <Text>기타</Text>
              </Row>
              <Row onPress={() => this._handleAllergy("f")}>
                <Icon>{this.renderIcon(allergies.includes("f"))}</Icon>
                <Text>없음</Text>
              </Row>
            </Body>
            <Bottom>
              <Button onPress={() => _updateState({ step: 0 })}>
                <ButtonText>취소</ButtonText>
              </Button>
              <Button
                onPress={() => _updateState({ allergies: allergies, step: 0 })}
              >
                <ButtonText>확인</ButtonText>
              </Button>
            </Bottom>
          </View>
        </Container>
      </Modal>
    )
  }
}

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`

const View = styled.View`
  width: 350px;
  height: 480px;
  border-radius: 5px;
  background-color: white;
`
const Header = styled.View`
  height: 60px;
  justify-content: center;
`
const Title = styled.Text`
  font-size: 20px;
  margin-left: 20px;
`
const Body = styled.ScrollView`
  width: 350px;
  height: 360px;
`
const Row = styled.TouchableOpacity`
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`
const Icon = styled.View`
  margin-left: 20px;
`
const Text = styled.Text`
  font-size: 14px;
  margin-left: 20px;
`

const Bottom = styled.View`
  border-top-color: #c9c9c9;
  border-top-width: 0.3px;
  height: 60px;
  justify-content: flex-end;
  flex-direction: row;
`

const Button = styled.TouchableOpacity`
  width: 60px;
  align-items: center;
  justify-content: center;
`
const ButtonText = styled.Text`
  color: ${Colors.tintColor};
`
