import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Modal } from "react-native"
import Colors from "../../../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

export default class extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    skin_concerns: PropTypes.array,
    _updateState: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      skin_concerns: props.skin_concerns
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

  _handleConcerns = concern => {
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
  render() {
    const { visible, _updateState } = this.props
    const { skin_concerns } = this.state
    return (
      <Modal visible={visible} transparent={true}>
        <Container>
          <View>
            <Header>
              <Title>피부 고민</Title>
            </Header>
            <Body>
              <Row onPress={() => this._handleConcerns("a")}>
                <Icon>{this.renderIcon(skin_concerns.includes("a"))}</Icon>
                <Text>여드름</Text>
              </Row>
              <Row onPress={() => this._handleConcerns("b")}>
                <Icon>{this.renderIcon(skin_concerns.includes("b"))}</Icon>
                <Text>블랙헤드</Text>
              </Row>
              <Row onPress={() => this._handleConcerns("c")}>
                <Icon>{this.renderIcon(skin_concerns.includes("c"))}</Icon>
                <Text>홍조</Text>
              </Row>
              <Row onPress={() => this._handleConcerns("d")}>
                <Icon>{this.renderIcon(skin_concerns.includes("d"))}</Icon>
                <Text>탄력</Text>
              </Row>
              <Row onPress={() => this._handleConcerns("e")}>
                <Icon>{this.renderIcon(skin_concerns.includes("e"))}</Icon>
                <Text>미백</Text>
              </Row>
              <Row onPress={() => this._handleConcerns("f")}>
                <Icon>{this.renderIcon(skin_concerns.includes("f"))}</Icon>
                <Text>미세먼지</Text>
              </Row>
              <Row onPress={() => this._handleConcerns("g")}>
                <Icon>{this.renderIcon(skin_concerns.includes("g"))}</Icon>
                <Text>SPF지수</Text>
              </Row>
              <Row onPress={() => this._handleConcerns("h")}>
                <Icon>{this.renderIcon(skin_concerns.includes("h"))}</Icon>
                <Text>기타</Text>
              </Row>
            </Body>
            <Bottom>
              <Button onPress={() => _updateState({ step: 0 })}>
                <ButtonText>취소</ButtonText>
              </Button>
              <Button
                onPress={() =>
                  _updateState({ skin_concerns: skin_concerns, step: 0 })
                }
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
  height: 600px;
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
  height: 480px;
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
