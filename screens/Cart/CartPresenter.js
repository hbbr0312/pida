import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { priceParser } from "../../utils";
import Item from "./Item";

/*
  cart: [
    {
      id
      name
      price
      number
      image
    },
    ...
  ]
*/

const Container = styled.View`
  flex: 1;
`;
const Items = styled.ScrollView`
  flex: 1;
  width: ${Layout.window.width};
`;

const Bottom = styled.View`
  border-top-width: 0.3px;
  border-top-color: grey;
  height: 200px;
  width: ${Layout.window.width};
`;

const PayInfo = styled.TouchableOpacity`
  height: 60px;
  margin-left: 15px;
  margin-right: 15px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.3px;
  border-bottom-color: grey;
`;
const DeliveryInfo = styled.TouchableOpacity`
  height: 60px;
  margin-left: 15px;
  margin-right: 15px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.3px;
  border-bottom-color: grey;
`;
const Info = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: 300;
`;

const Order = styled.View`
  height: 80px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${Colors.tintColor};
  flex: 1;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: white;
`;

const ButtonPrice = styled.Text`
  color: ${Colors.iconTintColor};
`;

const fakeData = [
  {
    id: 1,
    number: 2,
    name: "에이스킨 휴미드 인텐시브 로션",
    price: 31000,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/1.jpg"
  },
  {
    id: 12,
    number: 1,
    name: "브라운 프리미엄 72매 캡형 10+10",
    price: 48900,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/2_j5rUX8P.jpg"
  }
];

const calculatePrice = cart => {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.number;
  });
  return priceParser(total);
};
const CartPresenter = ({ cart, _openComplete }) => {
  const price = calculatePrice(cart);
  return (
    <Container>
      <Items>
        {cart.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </Items>
      <Bottom>
        <PayInfo onPress={() => alert("결제 정보")}>
          <Info>결제 정보</Info>
          <Ionicons name={"ios-arrow-forward"} color="grey" size={26} />
        </PayInfo>
        <DeliveryInfo onPress={() => alert("배송 정보")}>
          <Info>배송 정보</Info>
          <Ionicons name={"ios-arrow-forward"} color="grey" size={26} />
        </DeliveryInfo>
        <Order>
          <Button onPress={() => _openComplete()}>
            <ButtonText>주문하기</ButtonText>
            <ButtonPrice>{price}</ButtonPrice>
          </Button>
        </Order>
      </Bottom>
    </Container>
  );
};

CartPresenter.propTypes = {
  cart: PropTypes.array.isRequired,
  _openComplete: PropTypes.func.isRequired
};

export default CartPresenter;
