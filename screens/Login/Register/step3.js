import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Colors from "../../../constants/Colors";

// skin_type 0~3
// skin_concerns a~h
// allergies a~f

const Box = styled.View`
  margin-left: 30px;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;
const Row = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
`;
const Item = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;
const Text = styled.Text``;

const Radio = on => {
  if (on) {
    return (
      <Ionicons
        name={"ios-radio-button-on"}
        size={30}
        color={Colors.tintColor}
      />
    );
  } else
    return <Ionicons name={"ios-radio-button-off"} size={30} color="grey" />;
};

const CheckBox = on => {
  if (on) {
    return (
      <Ionicons name={"ios-checkbox"} size={30} color={Colors.tintColor} />
    );
  } else return <Ionicons name={"ios-square-outline"} size={30} color="grey" />;
};

const Step3 = ({ skin_type, skin_concerns, allergies }) => {
  return (
    <>
      <Box>
        <Title>피부 타입</Title>
        <Row>
          <Item>
            {Radio(skin_type === 0)}
            <Text>건성</Text>
          </Item>
          <Item>
            {Radio(skin_type === 1)}
            <Text>중성</Text>
          </Item>
        </Row>
        <Row>
          <Item>
            {Radio(skin_type === 2)}
            <Text>지성</Text>
          </Item>
          <Item>
            {Radio(skin_type === 3)}
            <Text>복합</Text>
          </Item>
        </Row>
      </Box>
      <Box>
        <Title>피부 고민</Title>
        <Row>
          <Item>
            {CheckBox(skin_concerns.includes("a"))}
            <Text>여드름</Text>
          </Item>
          <Item>
            {CheckBox(skin_concerns.includes("b"))}
            <Text>블랙헤드</Text>
          </Item>
        </Row>
        <Row>
          <Item>
            {CheckBox(skin_concerns.includes("c"))}
            <Text>홍조</Text>
          </Item>
          <Item>
            {CheckBox(skin_concerns.includes("d"))}
            <Text>탄력</Text>
          </Item>
        </Row>
        <Row>
          <Item>
            {CheckBox(skin_concerns.includes("e"))}
            <Text>미백</Text>
          </Item>
          <Item>
            {CheckBox(skin_concerns.includes("f"))}
            <Text>미세먼지</Text>
          </Item>
        </Row>
        <Row>
          <Item>
            {CheckBox(skin_concerns.includes("g"))}
            <Text>SPF 지수</Text>
          </Item>
          <Item>
            {CheckBox(skin_concerns.includes("h"))}
            <Text>기타</Text>
          </Item>
        </Row>
      </Box>
      <Box>
        <Title>알러지</Title>
        <Row>
          <Item>
            {CheckBox(allergies.includes("a"))}
            <Text>땅콩</Text>
          </Item>
          <Item>
            {CheckBox(allergies.includes("b"))}
            <Text>알콜</Text>
          </Item>
        </Row>
        <Row>
          <Item>
            {CheckBox(allergies.includes("c"))}
            <Text>천연 추출물</Text>
          </Item>
          <Item>
            {CheckBox(allergies.includes("d"))}
            <Text>향</Text>
          </Item>
        </Row>
        <Row>
          <Item>
            {CheckBox(allergies.includes("e"))}
            <Text>기타</Text>
          </Item>
          <Item>
            {CheckBox(allergies.includes("f"))}
            <Text>없음</Text>
          </Item>
        </Row>
      </Box>
    </>
  );
};

Step3.propTypes = {
  skin_type: PropTypes.number.isRequired,
  skin_concerns: PropTypes.array.isRequired,
  allergies: PropTypes.array.isRequired
};
export default Step3;
