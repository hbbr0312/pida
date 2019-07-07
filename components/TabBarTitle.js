import React from "react";
import styled from "styled-components";
import Color from "../constants/Colors";

const Text = styled.Text`
  color: ${Color.tabIconSelected};
  font-size: 11px;
`;

export default function TabBarTitle(props) {
  return props.focused ? <Text>{props.title}</Text> : null;
}
