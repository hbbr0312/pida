import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../../../constants/Colors"
import MainItem from "./MainItem"
import { priceParser, timeParser } from "../../../utils"

const PidaDetail = ({ visible, closeModal, order, openDetail }) => {
  const time = makeTime(order.order_time)
  return (
    <Modal visible={visible} transparent={false}>
      <Container>
        <Close onPress={() => closeModal()}>
          <Ionicons name={"ios-close"} size={30} color={"grey"} />
        </Close>
        <View>
          <MainItem order={order} />
        </View>
        <OrderInfo>
          <Title bottom={true}>신청 정보</Title>
          <Row>
            <Property>{order.label === 1 ? "신청일시" : "주문일시"}</Property>
            <Value>{time}</Value>
          </Row>
          <Row>
            <Property>가격</Property>
            <Value>{priceParser(order.price)}</Value>
          </Row>
        </OrderInfo>
        <ProductInfo>
          <Title bottom={true}>상품 정보</Title>
          <PContainer>
            {order.products
              ? order.products.map((item, index) => (
                  <Product
                    border={index < order.products.length - 1}
                    key={index}
                    onPress={() => openDetail(item.product)}
                  >
                    <Image source={{ uri: item.product.image }} />
                    <TextContainer>
                      <Name>{item.product.name}</Name>
                      <Price>
                        {order.label === 1 ? "정가 " : ""}
                        {priceParser(item.product.price)}
                        {order.label === 2 ? ` / ${item.qty}개` : ""}
                      </Price>
                    </TextContainer>
                    <Icon>
                      <Ionicons name={"ios-more"} size={30} color={"black"} />
                    </Icon>
                  </Product>
                ))
              : null}
          </PContainer>
        </ProductInfo>
        <PayInfo>
          <Title>결제 정보</Title>
          <Icon>
            <Ionicons name={"ios-arrow-forward"} size={23} color={"black"} />
          </Icon>
        </PayInfo>
        <DeliveryInfo onPress={console.log(order.delivery_info)}>
          <Title>배송 정보</Title>
          <Icon>
            <Ionicons name={"ios-arrow-forward"} size={23} color={"black"} />
          </Icon>
        </DeliveryInfo>
      </Container>
    </Modal>
  )
}
PidaDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  order: PropTypes.object,
  openDetail: PropTypes.func.isRequired
}
export default PidaDetail

const makeTime = order_time => {
  if (!order_time) return ""
  const time = timeParser(order_time)
  return (
    time.year +
    "년 " +
    time.month +
    "월 " +
    time.day +
    "일 " +
    time.time +
    ":" +
    time.minute
  )
}
const Container = styled.ScrollView`
  margin-top: 50px;
`
const Close = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
`
const View = styled.View``

const OrderInfo = styled.View`
  margin-top: 20px;
`
const ProductInfo = styled.View`
  margin-top: 20px;
`
const Product = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-color: #c9c9c9;
  border-bottom-width: ${props => (props.border ? "0.3px" : "0")};
  align-items: center;
  height: 80px;
`

const PContainer = styled.View`
  margin-bottom: 20px;
`
const PayInfo = styled.TouchableOpacity`
  border-bottom-color: #c9c9c9;
  border-bottom-width: 0.3px;
  flex-direction: row;
  height: 50px;
  align-items: center;
`
const DeliveryInfo = styled.TouchableOpacity`
  flex-direction: row;
  height: 50px;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.Text`
  flex: 1;
  margin-left: 20px;
  font-size: 20px;
  margin-bottom: ${props => (props.bottom ? "20px" : "0px")};
`

const Property = styled.Text`
  font-size: 15px;
  font-weight: 500;
  width: 50px;
  margin-left: 20px;
`
const Value = styled.Text`
  margin-left: 20px;
`
const Name = styled.Text`
  font-size: 16px;
`
const Price = styled.Text`
  font-size: 14px;
  color: ${Colors.priceText};
`
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  height: 20px;
  margin-bottom: 10px;
`
const TextContainer = styled.View`
  flex-direction: column;
  margin-left: 10px;
  flex: 1;
`
const Image = styled.Image`
  margin-left: 20px;
  width: 70px;
  height: 70px;
`
const Icon = styled.View`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`
