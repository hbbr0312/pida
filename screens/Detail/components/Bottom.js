import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Layout from "../../../constants/Layout"
import Colors from "../../../constants/Colors"

const Container = styled.View`
  background-color: black;
  width: ${Layout.window.width};
  height: 90px;
  flex-direction: row;
  box-shadow: 0px -0.5px 5px grey;
`
const InPallete = styled.TouchableOpacity`
  flex: 1;
  background-color: ${Colors.tintColor};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
const InCart = styled.TouchableOpacity`
  flex: 1
  background-color: ${Colors.bgColor};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Join = styled.TouchableOpacity`
  flex: 1
  background-color: ${Colors.tintColor};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Text = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  letter-spacing: 2px;
  color: ${props => props.color};
`

const Bottom = ({
  tab,
  product,
  _addTester,
  _openCartModal,
  _openComplete
}) => {
  const add = no => {
    if (!product.selling) {
      Alert.alert(
        "알림",
        "품절된 상품입니다.",
        [{ text: "OK", style: "cancel" }],
        { cancelable: false }
      )
    } else {
      if (no === 1) _addTester(product)
      else if (no === 2) _openCartModal()
      else {
        console.log("공동구매")
        _openComplete(product)
      }
    }
  }
  if (tab === "category")
    return (
      <Container>
        <InPallete onPress={() => add(1)}>
          <Ionicons
            name="ios-color-palette"
            size={25}
            color={Colors.iconTintColor}
          />
          <Text color="white">테스터 제품 담기</Text>
        </InPallete>
        <InCart
          onPress={() => {
            add(2)
            //putToCart(1);
          }}
        >
          <Ionicons name="ios-cart" size={25} color="grey" />
          <Text color="black">장바구니 담기</Text>
        </InCart>
      </Container>
    )
  else if (tab === "group_buying")
    return (
      <Container>
        <Join onPress={() => add(3)}>
          <Ionicons name="ios-people" size={25} color={Colors.iconTintColor} />
          <Text color="white">참여하기</Text>
        </Join>
      </Container>
    )
  else return null
}

Bottom.propTypes = {
  tab: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  _addTester: PropTypes.func,
  _openCartModal: PropTypes.func,
  _openComplete: PropTypes.func
}

export default Bottom
