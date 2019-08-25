import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Modal } from "react-native"
import Colors from "../../../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

export default class extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    skin_type: PropTypes.number,
    _updateState: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      skin_type: props.skin_type
    }
  }
  renderIcon = (on = false) => {
    if (on)
      return (
        <Ionicons
          name={"ios-radio-button-on"}
          size={30}
          color={Colors.tintColor}
        />
      )
    else
      return <Ionicons name={"ios-radio-button-off"} size={30} color="grey" />
  }
  _handleType = code => {
    this.setState({ skin_type: code })
  }
  render() {
    const { visible, _updateState } = this.props
    const { skin_type } = this.state
    return (
      <Modal visible={visible} transparent={true}>
        <Container>
          <View>
            <Header>
              <Title>피부 타입</Title>
            </Header>
            <Row onPress={() => this._handleType(0)}>
              <Icon>{this.renderIcon(skin_type === 0)}</Icon>
              <Text>건성</Text>
            </Row>
            <Row onPress={() => this._handleType(1)}>
              <Icon>{this.renderIcon(skin_type === 1)}</Icon>
              <Text>중성</Text>
            </Row>
            <Row onPress={() => this._handleType(2)}>
              <Icon>{this.renderIcon(skin_type === 2)}</Icon>
              <Text>지성</Text>
            </Row>
            <Row onPress={() => this._handleType(3)}>
              <Icon>{this.renderIcon(skin_type === 3)}</Icon>
              <Text>복합성</Text>
            </Row>
            <Bottom>
              <Button onPress={() => _updateState({ step: 0 })}>
                <ButtonText>취소</ButtonText>
              </Button>
              <Button
                onPress={() => _updateState({ skin_type: skin_type, step: 0 })}
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
  height: 360px;
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
