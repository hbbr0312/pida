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
  shadow-radius: 3;
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

const Small3 = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: white;
  box-shadow: 0px 5px 5px grey;
`;

const SHole = styled.View`
  width: ${props => props.radius * 2};
  height: ${props => props.radius * 2};
  border-radius: ${props => props.radius};
  background-color: ${props =>
    props.isFilled ? Colors.filledHole : Colors.emptyHole};
  margin-top: ${props => props.marginTop};
  margin-left: ${props => props.marginLeft};
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const SShadow = styled.View`
  width: ${props => props.radius * 2};
  height: ${props => props.radius * 2};
  border-radius: ${props => props.radius};
  background-color: transparent;
  border-color: white;
  border-width: 1;
  overflow: hidden;
  shadow-color: black;
  shadow-radius: 2;
  shadow-opacity: 1;
`;

const Small7 = styled.View`
  width: 170px;
  height: 170px;
  border-radius: 85px;
  background-color: white;
  box-shadow: 0px 5px 5px grey;
`;
const makeHole = (radius, marginTop, marginLeft, index) => {
  return (
    <SHole
      isFilled={true}
      radius={radius}
      marginTop={marginTop}
      marginLeft={marginLeft}
      key={index}
    >
      <SShadow radius={radius} />
    </SHole>
  );
};
const palette3 = [
  {
    radius: 14,
    marginTop: 23,
    marginLeft: 61
  },
  {
    radius: 14,
    marginTop: 83,
    marginLeft: 28
  },
  {
    radius: 14,
    marginTop: 83,
    marginLeft: 94
  }
];
const palette7 = [
  {
    radius: 13,
    marginTop: 17,
    marginLeft: 72
  },
  {
    radius: 13,
    marginTop: 41,
    marginLeft: 32
  },
  {
    radius: 13,
    marginTop: 41,
    marginLeft: 112
  },
  {
    radius: 13,
    marginTop: 84,
    marginLeft: 20
  },
  {
    radius: 13,
    marginTop: 84,
    marginLeft: 124
  },
  {
    radius: 13,
    marginTop: 122,
    marginLeft: 48
  },
  {
    radius: 13,
    marginTop: 122,
    marginLeft: 96
  }
];

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

export const Palette3 = ({}) => {
  return (
    <Small3>
      {palette3.map((item, index) =>
        makeHole(item.radius, item.marginTop, item.marginLeft, index)
      )}
    </Small3>
  );
};

export const Palette7 = ({}) => {
  return (
    <Small7>
      {palette7.map((item, index) =>
        makeHole(item.radius, item.marginTop, item.marginLeft, index)
      )}
    </Small7>
  );
};
