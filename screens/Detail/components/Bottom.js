import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import { put2cart } from "../../../utils";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  background-color: black;
  width: ${Layout.window.width};
  height: 90px;
  flex-direction: row;
  box-shadow: 0px -0.5px 5px grey;
`;
const InPallete = styled.TouchableOpacity`
  flex: 1;
  background-color: ${Colors.tintColor};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const InCart = styled.TouchableOpacity`
  flex: 1
  background-color: ${Colors.bgColor};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Join = styled.TouchableOpacity`
  flex: 1
  background-color: ${Colors.tintColor};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Text = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  letter-spacing: 2px;
  color: ${props => props.color};
`;

const Bottom = ({ tab, product, _addTester, navigation }) => {
  const putToCart = async number => {
    try {
      const no = await put2cart(product, number);
      if (no === 1) {
        Alert.alert(
          "상품 담기 완료",
          "장바구니로 이동하시겠습니까?",
          [
            {
              text: "장바구니로 이동",
              onPress: () =>
                navigation.navigate({
                  routeName: "Cart"
                })
            },
            { text: "취소", style: "cancel" }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "경고",
          "이미 담긴 상품입니다",
          [{ text: "OK", style: "cancel" }],
          { cancelable: false }
        );
      }
    } catch {}
  };

  if (tab === "category")
    return (
      <Container>
        <InPallete onPress={() => _addTester(product)}>
          <Ionicons
            name="ios-color-palette"
            size={25}
            color={Colors.iconTintColor}
          />
          <Text color="white">테스터 제품 담기</Text>
        </InPallete>
        <InCart
          onPress={() => {
            putToCart(1);
          }}
        >
          <Ionicons name="ios-cart" size={25} color="grey" />
          <Text color="black">장바구니 담기</Text>
        </InCart>
      </Container>
    );
  else if (tab === "group_buying")
    return (
      <Container>
        <Join onPress={() => alert("참여하기")}>
          <Ionicons name="ios-people" size={25} color={Colors.iconTintColor} />
          <Text color="white">참여하기</Text>
        </Join>
      </Container>
    );
  else return null;
};

Bottom.propTypes = {
  tab: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  _addTester: PropTypes.func
};

export default withNavigation(Bottom);
