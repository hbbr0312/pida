import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Product from "./Product";
import Swiper from "react-native-swiper";
import Layout from "../../../constants/Layout";

const SWIPER_HEIGHT = Layout.window.height / 2.2;

const Container = styled.View`
  height: ${SWIPER_HEIGHT};
  width: ${Layout.window.width};
  margin-top: 30px;
`;

const Btn = styled.Text`
  color: grey;
  font-size: 30px;
`;

const ProductListPresenter = ({ products, navigation }) => {
  const nextBtn = <Btn> › </Btn>;
  const prevBtn = <Btn> ‹ </Btn>;
  return (
    <Container>
      <Swiper
        showsPagination={false}
        autoplay={false}
        showsButtons={true}
        prevButton={prevBtn}
        nextButton={nextBtn}
      >
        {products.map(product => (
          <Product product={product} key={product.id} navigation={navigation} />
        ))}
      </Swiper>
    </Container>
  );
};

ProductListPresenter.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductListPresenter;
