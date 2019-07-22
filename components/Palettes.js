import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

/*
 palette: {  
            size,
            selected : {
                id,
                name
            }
        }
*/
const Small2 = styled.View`
  width: 130px;
  height: 65px;
  border-radius: 32.5px;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 5px grey;
`;

const Big2 = styled.View`
  width: 170px;
  height: 85px;
  border-radius: 42.5px;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 5px grey;
`;

const BigHole = styled.View`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  background-color: ${props =>
    props.isFilled ? Colors.filledHole : Colors.emptyHole};
  margin: 17px;
`;

const SmallHole = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${props =>
    props.isFilled ? Colors.filledHole : Colors.emptyHole};
  margin: 13px;
`;

export const Palette2 = ({ isSmall, filled }) => {
  if (isSmall)
    return (
      <Small2>
        <SmallHole isFilled={true} />
        <SmallHole isFilled={true} />
      </Small2>
    );
  else {
    return (
      <Big2>
        {filled >= 1 ? (
          <BigHole isFilled={true} />
        ) : (
          <BigHole isFilled={false} />
        )}
        {filled >= 2 ? (
          <BigHole isFilled={true} />
        ) : (
          <BigHole isFilled={false} />
        )}
      </Big2>
    );
  }
};
