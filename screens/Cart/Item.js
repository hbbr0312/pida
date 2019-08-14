import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { priceParser, removeProduct, updateProduct } from "../../utils";
import CartModal from "./CartModal";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100px;
  width: ${Layout.window.width};
  border-bottom-width: 0.3px;
  border-bottom-color: grey;
`;

const ImageSection = styled.View`
  margin-left: 15px;
  justify-content: center;
  height: 100px;
  width: 90px;
`;

const IconSection = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  height: 50px;
  width: 50px;
`;

const Image = styled.Image`
  width: 80px;
  height: 80px;
`;

const Text = styled.View`
  justify-content: center;
  flex: 1;
  height: 100px;
`;
const Name = styled.Text`
  font-size: 17px;
`;
const Price = styled.Text`
  color: ${Colors.priceText};
  margin-top: 3px;
  font-size: 15px;
`;

export default class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    _update: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  openCartModal = () => {
    this.setState({ modalVisible: true });
  };

  closeCartModal = () => {
    this.setState({ modalVisible: false });
  };

  updateCart = async (id, number) => {
    let cart;
    this.closeCartModal();
    const { _update } = this.props;
    cart = await updateProduct(id, number);
    _update(cart);
  };

  select = item => {
    const { _update } = this.props;
    Alert.alert(
      "장바구니 상품 수정",
      item.name,
      [
        { text: "수량 변경", onPress: () => this.openCartModal(item) },
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "삭제",
          onPress: async () => {
            const cart = await removeProduct(item.id);
            _update(cart);
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { modalVisible } = this.state;
    const { item } = this.props;
    return (
      <>
        <Container>
          <ImageSection>
            <Image source={{ uri: item.image }} />
          </ImageSection>
          <Text>
            <Name>{item.name}</Name>
            <Price>
              {priceParser(item.price)} / {item.number}개
            </Price>
          </Text>
          <IconSection onPress={() => this.select(item)}>
            <Ionicons name={"ios-more"} color="black" size={26} />
          </IconSection>
        </Container>
        <CartModal
          visible={modalVisible}
          item={item}
          _closeCartModal={this.closeCartModal}
          _updateCart={this.updateCart}
        />
      </>
    );
  }
}
