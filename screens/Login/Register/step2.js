import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import PropTypes from "prop-types";
import { identify } from "expo-analytics-segment";

//gender
//age

const Box = styled.View`
  margin-left: 30px;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;
const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
`;
const Text = styled.Text`
  margin-left: 10px;
  font-size: 14px;
`;

const Radio = (on = false) => {
  if (on)
    return (
      <Ionicons
        name={"ios-radio-button-on"}
        size={30}
        color={Colors.tintColor}
      />
    );
  else return <Ionicons name={"ios-radio-button-off"} size={30} color="grey" />;
};

const Step2 = ({gender, age}) => {
    return (
        <>
        <Box>
          <Title>성별</Title>
          <Row onPress={}>
            {Radio(gender === 0)}
            <Text>여성</Text>
          </Row>
          <Row key={1}>
            {Radio(gender === 1)}
            <Text>남성</Text>
          </Row>
        </Box>
        <Box>
          <Title>나이</Title>
          <Row>
            {Radio(age === 0)}
            <Text>19세 이하</Text>
          </Row>
          <Row>
            {Radio(age === 1)}
            <Text>20 ~ 26세</Text>
          </Row>
          <Row>
            {Radio(age === 2)}
            <Text>27 ~ 36세</Text>
          </Row>
          <Row>
            {Radio(age === 3)}
            <Text>37 ~ 50세</Text>
          </Row>
          <Row>
            {Radio(age === 4)}
            <Text>51세 이상</Text>
          </Row>
        </Box>
      </>
    )
}
Step2.propTypes = {
    gender: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired
}
export default Step2;