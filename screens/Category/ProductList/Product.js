import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";

const Container = styled.View`
  background-color: ${Colors.bgColor};
  width: ${Layout.window.width - 100};
  flex: 0.98;
  align-self: center;
  border-radius: 10px;
  box-shadow: 0px 0px 5px grey;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Touchable = styled.TouchableOpacity`
  flex: 1;
`;

const Image = styled.Image`
  width: 160px;
  height: 160px;
  margin-top: 20px;
  align-self: center;
  flex: 7;
`;

const Text = styled.View`
  margin-left: 20px;
  margin-top: 20px;
  flex: 3;
`;
const Brand = styled.Text`
  margin-top: 5px;
  color: ${Colors.brandText};
  font-size: 15px;
`;

const Name = styled.Text`
  margin-top: 5px;
  font-size: 20px;
`;

const Price = styled.Text`
  color: ${Colors.priceText};
  margin-top: 5px;
  font-size: 15px;
`;

const Product = ({ product, navigation }) => {
  return (
    <Container>
      <Touchable
        onPress={() =>
          navigation.navigate({
            routeName: "Detail",
            params: {
              tab: "category",
              product
            }
          })
        }
      >
        <Image source={{ uri: product.image }} />
        <Text>
          <Brand>{product.brand.name}</Brand>
          <Name>{product.name}</Name>
          <Price>₩ {product.price}</Price>
        </Text>
      </Touchable>
    </Container>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;
