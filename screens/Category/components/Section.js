import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import Item from "./Item";
import { LinearGradient } from "expo-linear-gradient";

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
  overflow: hidden;
`;
//background-color: ${props => props.color};
const Text = styled.Text`
  margin-top: 15px;
  margin-left: 15px;
  font-size: 20px;
  color: white;
`;

/*This is section for Category*/
const Section = ({ name, items, colors, itemColor = "#fff1f2" }) => {
  return (
    <Container>
      <Box>
        <LinearGradient
          start={[0, 0]}
          end={[1, 0]}
          colors={colors}
          style={{
            flex: 1
          }}
        >
          <Text>{name}</Text>
        </LinearGradient>
      </Box>
      {items.map((item, index) =>
        index === items.length - 1 ? (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            products={item.products}
            isLast={true}
            itemColor={itemColor}
          />
        ) : (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            products={item.products}
            itemColor={itemColor}
          />
        )
      )}
    </Container>
  );
};

Section.proptypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array,
  colors: PropTypes.array.isRequired,
  itemColor: PropTypes.string
};

export default Section;
