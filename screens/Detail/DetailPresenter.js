import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ProductSection from "./components/ProductSection";
import InfoSection from "./components/InfoSection";
import IngredientSection from "./components/IngredientSection";
import ReviewSection from "./components/ReviewSection";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../../components/ProgressBar";
import { put2cart, add2palette } from "../../utils";

const Bottom = styled.View`
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

const Container = styled.ScrollView``;

const Progress = styled.View`
  border-bottom-color: grey;
  border-bottom-width: 0.3px;
`;

const createBottom = (tab, product) => {
  if (tab === "category")
    return (
      <Bottom>
        <InPallete
          onPress={() => {
            add2palette(product);
          }}
        >
          <Ionicons
            name="ios-color-palette"
            size={25}
            color={Colors.iconTintColor}
          />
          <Text color="white">테스터 제품 담기</Text>
        </InPallete>
        <InCart
          onPress={() => {
            put2cart(product, 1);
          }}
        >
          <Ionicons name="ios-cart" size={25} color="grey" />
          <Text color="black">장바구니 담기</Text>
        </InCart>
      </Bottom>
    );
  else if (tab === "group_buying")
    return (
      <Bottom>
        <Join onPress={() => alert("참여하기")}>
          <Ionicons name="ios-people" size={25} color={Colors.iconTintColor} />
          <Text color="white">참여하기</Text>
        </Join>
      </Bottom>
    );
  else return null;
};

const DetailPresenter = ({
  product,
  tab,
  discount_rates,
  orders_num,
  period
}) => {
  return (
    <>
      <Container>
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
      {createBottom(tab, product)}
    </>
  );
};

DetailPresenter.propTypes = {
  tab: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  discount_rates: PropTypes.array,
  orders_num: PropTypes.number,
  period: PropTypes.string
};

export default DetailPresenter;
