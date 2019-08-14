import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colors from "../../constants/Colors";
import { Modal } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Box = styled.View`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 5px;
`;

const Top = styled.View`
  width: 300px;
  height: 230px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const UpDown = styled.TouchableOpacity`
  border-width: 0.25px;
  border-color: ${props => props.color};
  width: 50px;
  height: 50px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  border-width: 0.25px;
  border-color: grey;
  border-radius: 2px;
  margin: 10px;
  width: 70px;
  height: 50px;
  font-size: 25px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const UpDownText = styled.Text`
  color: ${props => props.color};
  font-size: 30px;
  font-weight: 300;
`;
const Bottom = styled.View`
  height: 70px;
  width: 300px;
  flex-direction: row;
`;
const Cancel = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top-width: 0.25px;
  border-top-color: grey;
  border-right-width: 0.25px;
  border-right-color: grey;
`;
const Confirm = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top-width: 0.25px;
  border-top-color: grey;
  border-left-width: 0.25px;
  border-left-color: grey;
`;
const BottomText = styled.Text``;

export default class CartModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    _closeCartModal: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    _updateCart: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      id: props.item.id,
      number: props.item.number
    };
  }

  changeNum = isUp => {
    const { number } = this.state;
    let result = Number(number);
    if (isUp) result += 1;
    else if (result > 1) result -= 1;
    else return;
    this.setState({ number: String(result) });
  };

  render() {
    const { visible, _closeCartModal, _updateCart } = this.props;
    const { id, number } = this.state;
    return (
      <Modal visible={visible} transparent={true}>
        <Container>
          <Box>
            <Top>
              <UpDown
                color={Colors.minusColor}
                onPress={() => this.changeNum(false)}
              >
                <UpDownText color={Colors.minusColor}>-</UpDownText>
              </UpDown>
              <Input
                keyboardType={"number-pad"}
                returnKeyType={"done"}
                textAlign={"center"}
                value={String(number)}
                onChangeText={text => this.setState({ number: text })}
              />
              <UpDown
                color={Colors.plusColor}
                onPress={() => this.changeNum(true)}
              >
                <UpDownText color={Colors.plusColor}>+</UpDownText>
              </UpDown>
            </Top>
            <Bottom>
              <Cancel onPress={() => _closeCartModal()}>
                <BottomText>취소</BottomText>
              </Cancel>
              <Confirm onPress={async () => _updateCart(id, Number(number))}>
                <BottomText>담기</BottomText>
              </Confirm>
            </Bottom>
          </Box>
        </Container>
      </Modal>
    );
  }
}
