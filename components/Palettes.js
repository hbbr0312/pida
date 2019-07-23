import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

const Small2 = styled.View`
  width: 130px;
  height: 76px;
  border-radius: 38px;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 5px grey;
`;

const SmallHole = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props =>
    props.isFilled ? Colors.filledHole : Colors.emptyHole};
  margin: 12px;
  justify-content: center;
  align-items: center;
`;

const SmallShadow = styled.View`
  width: 31px;
  height: 31px;
  border-radius: 15.5px;
  background-color: transparent;
  border-color: white;
  border-width: 1;
  overflow: hidden;
  shadow-color: black;
  shadow-radius: 5;
  shadow-opacity: 1;
`;

const Big2 = styled.View`
  width: 170px;
  height: 100px;
  border-radius: 50px;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${props => (props.shadow ? "box-shadow: 0px 5px 5px grey" : null)};
`;

const BigHole = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props =>
    props.isFilled ? Colors.filledHole : Colors.emptyHole};
  margin: 17px;
  justify-content: center;
  align-items: center;
`;

const BigShadow = styled.View`
  width: 41px;
  height: 41px;
  background-color: transparent;
  border-color: white;
  border-width: 1;
  border-radius: 20.5px;
  overflow: hidden;
  shadow-color: black;
  shadow-radius: 5;
  shadow-opacity: 1;
`;

export const Palette2 = ({ isSmall, filled, shadow }) => {
  if (isSmall)
    return (
      <Small2>
        <SmallHole isFilled={true}>
          <SmallShadow />
        </SmallHole>
        <SmallHole isFilled={true}>
          <SmallShadow />
        </SmallHole>
      </Small2>
    );
  else {
    return (
      <Big2 shadow={shadow}>
        {filled >= 1 ? (
          <BigHole isFilled={true}>
            <BigShadow />
          </BigHole>
        ) : (
          <BigHole isFilled={false}>
            <BigShadow />
          </BigHole>
        )}
        {filled >= 2 ? (
          <BigHole isFilled={true}>
            <BigShadow />
          </BigHole>
        ) : (
          <BigHole isFilled={false}>
            <BigShadow />
          </BigHole>
        )}
      </Big2>
    );
  }
};
