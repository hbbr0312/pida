import styled from "styled-components";
import Colors from "../constants/Colors";

export const Layer = styled.View`
  background-color: ${Colors.fakeLayer};
  border-top-left-radius: ${props => (props.top ? "5px" : "0px")};
  border-top-end-radius: ${props => (props.top ? "5px" : "0px")};
  border-bottom-left-radius: ${props => (props.top ? "0px" : "5px")};
  border-bottom-end-radius: ${props => (props.top ? "0px" : "5px")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
