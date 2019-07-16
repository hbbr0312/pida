import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-left: 15px;
`;
export const Back = ({ navigation }) => {
  return (
    <Container
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name={"ios-arrow-back"} color="grey" size={26} />
    </Container>
  );
};

export const Close = ({ navigation }) => {
  return (
    <Container
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name={"ios-close"} color="grey" size={35} />
    </Container>
  );
};
