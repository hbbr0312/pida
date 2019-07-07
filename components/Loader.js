import React from "react";
import { ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.bgColor};
  justify-content: center;
`;

export default () => (
  <Container>
    <ActivityIndicator color={Colors.tintColor} />
  </Container>
);
