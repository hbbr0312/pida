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
const Text = styled.Text`
  margin-left: 10px;
  color: ${props => props.color};
`;
const Container = styled.ScrollView``;
const DetailPresenter = ({ product, tab }) => {
  console.log(product);
  return (
    <>
      <Container>
        <ProductSection
          image={product.image}
          brand_name={product.brand.name}
          name={product.name}
          price={product.price}
        />
        <InfoSection
          seller={product.info_seller}
          manufacture={product.info_manufacturer}
          country={product.info_country}
          infoUrl={product.info_url}
        />
        <IngredientSection ingredients={product.ingredients} />
        <ReviewSection reviews={product.reviews} />
      </Container>
      <Bottom>
        <InPallete onPress={() => alert("테스터제품")}>
          <Ionicons name="ios-color-palette" size={20} color="white" />
          <Text color="white">테스터 제품 담기</Text>
        </InPallete>
        <InCart onPress={() => alert("장바구니")}>
          <Ionicons name="ios-cart" size={20} color="grey" />
          <Text color="black">장바구니 담기</Text>
        </InCart>
      </Bottom>
    </>
  );
};

DetailPresenter.propTypes = {
  tab: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired
};

export default DetailPresenter;
