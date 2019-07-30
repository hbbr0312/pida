import React from "react";
import { Modal } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { Palette2 } from "./Palettes";

const Container = styled.View`
  background-color: white;
  flex: 1;
`;

const Top = styled.View`
  justify-content: center;
  align-items: center;
  flex: 3;
`;
const Bottom = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin-bottom: 20px;
`;
const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
`;
const Image = styled.Image`
  height: 200px;
  width: 200px;
`;

const Notice = styled.Text`
  margin-top: 52px;
  font-weight: 500;
  letter-spacing: 2.5px;
  font-size: 34px;
`;

const ToMyPida = styled.TouchableOpacity`
  height: 50px;
  width: ${Layout.window.width - 32};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.tintColor};
`;

const Text = styled.Text`
  color: ${props => props.color};
  letter-spacing: 2px;
  font-size: 14px;
`;

const ToMain = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 28px;
`;

const Complete = ({ navigation, from, img, visible, _closeComplete }) => {
  let notice;
  if (from === "palette") {
    notice = "신청 완료!";
  } else if (from === "order") {
    notice = "주문 완료!";
  } else {
    //from === "groupBuying"
    notice = "참여 완료!";
  }
  return (
    <Modal visible={visible} transparent={false}>
      <Container>
        <Top>
          <ImageContainer>
            {from === "palette" ? (
              <Palette2 isSmall={false} shadow={true} filled={2} />
            ) : (
              <Image source={{ uri: img }} />
            )}
          </ImageContainer>
          <Notice>{notice}</Notice>
        </Top>
        <Bottom>
          <ToMyPida
            onPress={() => {
              _closeComplete();
              navigation.navigate({
                routeName: "MyPida"
              });
            }}
          >
            <Text color="white">MY피다에서 확인하기</Text>
          </ToMyPida>
          <ToMain
            onPress={() => {
              _closeComplete();
              navigation.navigate({
                routeName: "Category"
              });
            }}
          >
            <Text color="grey">처음으로</Text>
          </ToMain>
        </Bottom>
      </Container>
    </Modal>
  );
};

Complete.propTypes = {
  from: PropTypes.string.isRequired,
  img: PropTypes.string, //주문 완료, 참여 완료
  visible: PropTypes.bool.isRequired,
  _closeComplete: PropTypes.func.isRequired
};

export default withNavigation(Complete);
