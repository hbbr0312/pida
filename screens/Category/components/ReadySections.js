import React from "react";
import styled from "styled-components";
import Item from "./Item";
import Layout from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import { Layer } from "../../../components/Layer";

const ready = [
  {
    id: -1,
    big_name: "토너",
    color: "#1a8c00",
    name: "전체",
    products: [],
    items: [{ name: "전체", products: [], id: -1 }]
  },
  {
    id: -2,
    big_name: "세안제",
    color: "#ed5700",
    name: "전체",
    products: [],
    items: [{ name: "전체", products: [], id: -2 }]
  }
];

const View = styled.View`
  margin-bottom: 15px;
`;
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
  background-color: ${props => props.color};
  position: relative;
`;

const Text = styled.Text`
  margin-top: 15px;
  margin-left: 15px;
  font-size: 20px;
  color: white;
`;
const Notice = styled.Text`
  color: white;
  align-self: center;
  font-size: 20px;
  margin-top: 55px;
`;
const Touchable = styled.TouchableOpacity``;

const ReadySections = () => (
  <View>
    {ready.map(data => (
      <Touchable key={data.id} onPress={() => alert("준비중입니다.")}>
        <Container>
          <Box color={data.color}>
            <Layer top={true}>
              <Text>{data.big_name}</Text>
              <Notice>준비중</Notice>
            </Layer>
          </Box>
          <Item
            key={data.id}
            id={data.id}
            name={data.name}
            products={data.products}
            isFake={true}
            isLast={true}
          />
        </Container>
      </Touchable>
    ))}
  </View>
);

export default ReadySections;
