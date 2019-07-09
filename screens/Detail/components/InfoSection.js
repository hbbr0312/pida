import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Container, Title } from "./Styled";
import { Linking } from "react-native";
import Colors from "../../../constants/Colors";

const Box = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  margin-left: 20px;
`;
const Name = styled.Text`
  font-weight: 800;
  width: 100px;
`;
const Text = styled.Text``;

const InfoSection = ({ seller, manufacture, country, infoUrl }) => {
  return (
    <Container>
      <Title>제품 정보</Title>
      <Box>
        <Name>제조판매업자</Name>
        <Text>{seller}</Text>
      </Box>
      <Box>
        <Name>제조사</Name>
        <Text>{manufacture}</Text>
      </Box>
      <Box>
        <Name>제조국</Name>
        <Text>{country}</Text>
      </Box>
      <Box>
        <Name>상세정보</Name>
        <Text
          style={{ color: Colors.tintColor }}
          onPress={() => Linking.openURL(infoUrl)}
        >
          바로가기
        </Text>
      </Box>
    </Container>
  );
};

InfoSection.propTypes = {
  seller: PropTypes.string.isRequired,
  manufacture: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  infoUrl: PropTypes.string.isRequired
};

export default InfoSection;
