import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Product from "./components/Product";
import Swiper from "react-native-swiper";
import Layout from "../../../constants/Layout";
import { Palette2 } from "../../../components/Palettes";
import Colors from "../../../constants/Colors";
import { countSelected } from "../../../utils";

const SWIPER_HEIGHT = Layout.window.height / 2.2;

const Screen = styled.View`
  flex: 1;
  background-color: ${Colors.bgColor};
`;

const PaletteContainer = styled.View`
  flex:1
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
`;

const Palette = styled.TouchableOpacity``;

const Container = styled.View`
  height: ${SWIPER_HEIGHT};
  width: ${Layout.window.width};
  margin-top: 30px;
`;

const Btn = styled.Text`
  color: grey;
  font-size: 30px;
`;

const ProductListPresenter = ({
  products,
  navigation,
  palette,
  _openModal,
  _openDetail
}) => {
  const nextBtn = <Btn> › </Btn>;
  const prevBtn = <Btn> ‹ </Btn>;
  console.log("problem:");
  console.log(palette);
  return (
    <Screen>
      <Container>
        <Swiper
          showsPagination={false}
          autoplay={false}
          showsButtons={true}
          prevButton={prevBtn}
          nextButton={nextBtn}
        >
          {products.map(product => (
            <Product
              product={product}
              key={product.id}
              navigation={navigation}
              _openDetail={_openDetail}
            />
          ))}
        </Swiper>
      </Container>
      <PaletteContainer>
        <Palette onPress={() => _openModal()}>
          <Palette2
            isSmall={false}
            shadow={true}
            filled={countSelected(palette)}
          />
        </Palette>
      </PaletteContainer>
    </Screen>
  );
};

ProductListPresenter.propTypes = {
  products: PropTypes.array.isRequired,
  palette: PropTypes.object.isRequired,
  _openModal: PropTypes.func.isRequired,
  _openDetail: PropTypes.func.isRequired
};

export default ProductListPresenter;
