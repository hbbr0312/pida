import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colors from "../../../constants/Colors";
import { priceParser } from "../../../utils";

const Container = styled.View`
  border-bottom-color: grey;
  border-bottom-width: ${props => (props.bottomLine ? "0.3px" : "0px")};
`;
const Image = styled.Image`
  align-self:center;
  width:200px
  height:200px
`;
const Brand = styled.Text`
  color: ${Colors.brandText};
  font-size: 15px;
  margin-top: 50px;
  margin-left: 20px;
`;
const Name = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  margin-left: 20px;
`;
const Price = styled.Text`
  color: ${Colors.priceText};
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 20px;
`;

const ProductSection = ({ image, brand_name, name, price, bottomLine }) => (
  <Container bottomLine={bottomLine}>
    <Image source={{ uri: image }} />
    <Brand>{brand_name}</Brand>
    <Name>{name}</Name>
    <Price>{priceParser(price)}</Price>
  </Container>
);

ProductSection.propTypes = {
  image: PropTypes.string.isRequired,
  brand_name: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  bottomLine: PropTypes.bool
};

export default ProductSection;
