import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Container } from "./Styled";
import { Ionicons } from "@expo/vector-icons";

const Title = styled.Text`
  font-size: 20px;
  flex: 1;
  margin-left: 20px;
`;

const Header = styled.View`
  height: 60px;
  align-items: center;
  flex-direction: row;
`;

const Open = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  width: 30px;
  margin-right: 20px;
`;

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

export default class IngredientSection extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, ingredients: props.ingredients };
  }

  static propTypes = {
    ingredients: PropTypes.array.isRequired
  };

  _handleClick = () => {
    const { open } = this.state;
    console.log("open");
    this.setState({ open: !open });
  };

  render() {
    console.log("render");
    const { open, ingredients } = this.state;
    let header;
    let info = null;
    if (open) {
      header = (
        <Header>
          <Title>성분</Title>
          <Open onPress={this._handleClick}>
            <Ionicons name={"ios-arrow-up"} color="grey" size={26} />
          </Open>
        </Header>
      );
      info = ingredients.map((item, index) => (
        <Box key={index} isLast={index === ingredients.length - 1}>
          <Label grade={item.ewg_grade} />
          <Name>{item.name}</Name>
        </Box>
      ));
    } else {
      header = (
        <Header>
          <Title>성분</Title>
          <Open onPress={this._handleClick}>
            <Ionicons name={"ios-arrow-down"} color="grey" size={26} />
          </Open>
        </Header>
      );
    }
    return (
      <Container>
        {header}
        {info}
      </Container>
    );
  }
}
