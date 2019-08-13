import React from "react";
import styled from "styled-components";
import Colors from "../../../constants/Colors";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
const Notice = styled.Text`
  color: grey;
  font-size: 20px;
  margin-top: 200px;
`;
const Button = styled.TouchableOpacity`
  width: 180px;
  height: 50px;
  border-radius: 4px;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.tintColor};
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  letter-spacing: 1px;
`;

export default (Complete = ({ _go2Login }) => {
  return (
    <Container>
      <Notice>회원가입이 완료되었습니다</Notice>
      <Button onPress={() => _go2Login()}>
        <ButtonText>로그인하러 가기</ButtonText>
      </Button>
    </Container>
  );
});
