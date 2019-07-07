import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.Text``;

const ProductList = ({ navigation }) => {
  return <Text>{navigation.state.params.name}</Text>;
};

ProductList.propTypes = {
  //name: PropTypes.string.isRequired
};

export default ProductList;
