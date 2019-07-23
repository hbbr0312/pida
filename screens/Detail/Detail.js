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

const Top = styled.View`
  height: 100px;
`;
const Close = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  margin-top: 50px;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.ScrollView``;

const Progress = styled.View`
  border-bottom-color: grey;
  border-bottom-width: 0.3px;
`;

const Detail = ({
  visible,
  product,
  tab,
  discount_rates,
  orders_num,
  period,
  _addTester,
  _closeDetail
}) => {
  if (visible) {
    return (
      <Modal visible={visible} transparent={false}>
        <Container>
          <Top>
            <Close onPress={() => _closeDetail()}>
              <Ionicons name="ios-close" size={35} color="grey" />
            </Close>
          </Top>
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
          <ReviewSection reviews={product.reviews} />
        </Container>
        <Bottom tab={tab} product={product} />
      </Modal>
    );
  } else {
    return (
      <Modal visible={visible} transparent={false} _addTester={_addTester} />
    );
  }
};

Detail.propTypes = {
  tab: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  _closeDetail: PropTypes.func.isRequired,
  discount_rates: PropTypes.array, //공동구매 탭
  orders_num: PropTypes.number, //공동구매 탭
  period: PropTypes.string, //공동구매 탭
  _addTester: PropTypes.func //카테고리 탭
};

export default Detail;
