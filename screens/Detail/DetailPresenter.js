import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ProductSection from "./components/ProductSection";
import InfoSection from "./components/InfoSection";
import IngredientSection from "./components/IngredientSection";
import ReviewSection from "./components/ReviewSection";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../../components/ProgressBar";
import { Modal } from "react-native";
import Bottom from "./components/Bottom";
import CartModal from "./components/CartModal";

const Header = styled.View`
  height: 40px;
`;

const Close = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  margin-top: 10px;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.ScrollView``;

const Progress = styled.View`
  border-bottom-color: grey;
  border-bottom-width: 0.3px;
`;

const DetailPresenter = ({
  visible,
  product,
  tab,
  discount_rates,
  orders_num,
  period,
  _addTester,
  _closeDetail,
  modalVisible,
  _openCartModal,
  _closeCartModal,
  number,
  _controlInput,
  _put2Cart,
  reviews
}) => {
  if (visible) {
    return (
      <Modal visible={visible} transparent={false}>
        <Header />
        <Container>
          <Close onPress={() => _closeDetail()}>
            <Ionicons name="ios-close" size={35} color="grey" />
          </Close>
          <ProductSection
            image={product.image}
            brand_name={product.brand.name}
            name={product.name}
            price={product.price}
            bottomLine={tab === "category"}
          />
          {tab === "group_buying" ? (
            <Progress>
              <ProgressBar
                period={period}
                marginBottom="20px"
                price={product.price}
                discount_rates={discount_rates}
                orders_num={orders_num}
              />
            </Progress>
          ) : null}
          <InfoSection
            seller={product.info_seller}
            manufacture={product.info_manufacturer}
            country={product.info_country}
            infoUrl={product.info_url}
          />
          <IngredientSection ingredients={product.ingredients} />
          <ReviewSection reviews={reviews} />
        </Container>
        <Bottom
          tab={tab}
          product={product}
          _openCartModal={_openCartModal}
          _addTester={_addTester}
        />
        <CartModal
          visible={modalVisible}
          _closeCartModal={_closeCartModal}
          number={number}
          _controlInput={_controlInput}
          _put2Cart={_put2Cart}
        />
      </Modal>
    );
  } else {
    return <Modal visible={visible} transparent={false} />;
  }
};

DetailPresenter.propTypes = {
  tab: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  _closeDetail: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  discount_rates: PropTypes.array, //공동구매 탭
  orders_num: PropTypes.number, //공동구매 탭
  period: PropTypes.string, //공동구매 탭
  _addTester: PropTypes.func, //카테고리 탭
  modalVisible: PropTypes.bool, //카테고리 탭
  _openCartModal: PropTypes.func, //카테고리 탭
  _closeCartModal: PropTypes.func, //카테고리 탭
  number: PropTypes.string, //카테고리 탭
  _controlInput: PropTypes.func, //카테고리 탭
  _put2Cart: PropTypes.func //카테고리 탭
};

export default DetailPresenter;
