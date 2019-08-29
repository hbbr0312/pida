import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../../../constants/Colors"
import MainItem from "./MainItem"

const image =
  "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/10.jpg"
const PidaDetail = ({ label, visible, closeModal, order }) => {
  console.log(order)
  let view
  if (label === 1)
    view = (
      <MainItem
        label={1}
        date={null}
        number={order.products.length}
        status={order.status}
      />
    )
  else if (label === 2)
    view = (
      <MainItem
        label={2}
        date={null}
        status={order.status}
        image={
          "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/1.jpg"
        }
      />
    )
  else
    view = (
      <MainItem
        label={3}
        date={null}
        status={order.status}
        image={
          "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/10.jpg"
        }
      />
    )
  return (
    <Modal visible={visible} transparent={false}>
      <Container>
        <Close onPress={() => closeModal()}>
          <Ionicons name={"ios-close"} size={30} color={"grey"} />
        </Close>
        <View>{view}</View>
        <OrderInfo>
          <Title bottom={true}>신청 정보</Title>
          <Row>
            <Property>{label === 1 ? "신청일시" : "주문일시"}</Property>
            <Value>{order.date}</Value>
          </Row>
          <Row>
            <Property>가격</Property>
            <Value>₩ 8,000</Value>
          </Row>
        </OrderInfo>
        <ProductInfo>
          <Title bottom={true}>상품 정보</Title>
          <PContainer>
            <Product border={true}>
              <Image source={{ uri: image }} />
              <TextContainer>
                <Name>세이프 미 릴리프 모이스처 크림 12</Name>
                <Price>정가 ₩ 28,000</Price>
              </TextContainer>
              <Icon>
                <Ionicons name={"ios-more"} size={30} color={"black"} />
              </Icon>
            </Product>
            <Product border={false}>
              <Image source={{ uri: image }} />
              <TextContainer>
                <Name>세이프 미 릴리프 모이스처 크림 12</Name>
                <Price>정가 ₩ 28,000</Price>
              </TextContainer>
              <Icon>
                <Ionicons name={"ios-more"} size={30} color={"black"} />
              </Icon>
            </Product>
          </PContainer>
        </ProductInfo>
        <PayInfo>
          <Title>결제 정보</Title>
          <Icon>
            <Ionicons name={"ios-arrow-forward"} size={30} color={"black"} />
          </Icon>
        </PayInfo>
        <DeliveryInfo>
          <Title>배송 정보</Title>
          <Icon>
            <Ionicons name={"ios-arrow-forward"} size={30} color={"black"} />
          </Icon>
        </DeliveryInfo>
      </Container>
    </Modal>
  )
}
PidaDetail.propTypes = {
  label: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  order: PropTypes.object
}
export default PidaDetail

const Container = styled.ScrollView``
const Close = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  margin-top: 50px;
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
