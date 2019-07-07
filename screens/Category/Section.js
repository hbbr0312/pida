import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import Item from "./Item";

const Container = styled.View`
  align-items: center;
  box-shadow: 0px 5px 5px grey;
`;
const Box = styled.View`
  margin-top: 15px;
  height: 200px;
  width: ${Layout.window.width - 30};
  border-top-left-radius: 5px;
  border-top-end-radius: 5px;
  background-color: #ff5158;
`;

const Text = styled.Text`
  margin-top: 15px;
  margin-left: 15px;
  font-size: 20px;
  color: white;
`;

/*This is section for Category*/
const Section = ({ name, items }) => (
  <Container>
    <Box>
      <Text>{name}</Text>
    </Box>
    {items.map((item, index) =>
      index === items.length - 1 ? (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          products={item.products}
          isLast={true}
        />
      ) : (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          products={item.products}
        />
      )
    )}
  </Container>
);

Section.proptypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array
};

export default Section;
