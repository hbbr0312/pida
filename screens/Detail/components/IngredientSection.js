import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Container, Title } from "./Styled";

const Box = styled.View`
  flex-direction: row;
  margin-left: 20px;
  margin-bottom: ${props => (props.isLast ? "20px" : "10px")};
`;

const Circle = styled.View`
  border-radius: 10px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
`;

const Grade = styled.Text``;

const Name = styled.Text`
  margin-left: 5px;
`;

const labelColor = grade => {
  if (grade <= 3) return "#BAE987";
  else if (grade > 3 || grade < 7) return "#F6A81D";
  else "#D10014";
};
const Label = ({ grade }) => (
  <Circle color={labelColor(grade)}>
    <Grade>{grade}</Grade>
  </Circle>
);

const IngredientSection = ({ ingredients }) => {
  return (
    <Container>
      <Title>성분</Title>
      {ingredients.map((item, index) => (
        <Box key={index} isLast={index === ingredients.length - 1}>
          <Label grade={item.ewg_grade} />
          <Name>{item.name}</Name>
        </Box>
      ))}
    </Container>
  );
};

IngredientSection.propTypes = {
  ingredients: PropTypes.array.isRequired
};

export default IngredientSection;
