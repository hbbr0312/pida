import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Palette2 } from "../../../../components/Palettes";
import { countSelected } from "../../../../utils";
import Layout from "../../../../constants/Layout";
import Colors from "../../../../constants/Colors";
import { initializePalette } from "../../../../utils";

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Close = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  margin-left: 30px;
  width: 40px;
  height: 40px;
`;

const PaletteContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Bottom = styled.View`
  justify-content: flex-end;
  align-items: center;
`;

const Text = styled.Text`
  align-self: flex-end;
  margin-right: 20px;
  margin-bottom: 10px;
  font-size: 15px;
  color: grey;
`;

const ProductBox = styled.View`
  height: ${props => props.size * 60};
  width: ${Layout.window.width - 40};
  background-color: white;
  border-radius: 5px;
`;

const InfoBox = styled.View`
  height: 120px;
  width: ${Layout.window.width - 40};
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
`;

const PayInfo = styled.TouchableOpacity`
  height: 60px;
  align-items: center;
  flex-direction: row;
  margin-left: 15px;
  margin-right: 20px;
  border-bottom-width: ${props => (props.isLast ? "0px " : "0.3px")};
  border-bottom-color: ${Colors.borderBottomColor};
`;

const DeliveryInfo = styled.TouchableOpacity`
  height: 60px;
  align-items: center;
  flex-direction: row;
  margin-left: 15px;
  margin-right: 20px;
`;

const InfoText = styled.Text`
  flex: 1;
  letter-spacing: 1px;
  font-size: 18px;
`;

const Button = styled.TouchableOpacity`
  height: 60px;
  width: ${Layout.window.width - 40};
  background-color: ${props => (props.disable ? "white" : Colors.tintColor)};
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
`;

const OrderText = styled.Text`
  color: ${props => (props.disable ? "grey" : "white")};
  letter-spacing: 1px;
  font-size: 18px;
`;

const Notice = styled.Text`
  color: grey;
  font-size: 13px;
  margin-top: 3px;
`;

const Remove = styled.TouchableOpacity``;

const View = styled.View`
  height: 60px;
  align-items: center;
  flex-direction: row;
  margin-left: 15px;
  margin-right: 20px;
  border-bottom-width: ${props => (props.isLast ? "0px " : "0.3px")};
  border-bottom-color: ${Colors.borderBottomColor};
`;

const PaletteModal = ({
  visible,
  _closeModal,
  palette,
  _removeTester,
  _clearPalette
}) => {
  const filled = countSelected(palette);
  const disable = filled !== palette.size;
  const Product = (id, name, isLast) => {
    return (
      <View key={id} isLast={isLast}>
        <InfoText>{name}</InfoText>
        <Remove onPress={() => _removeTester(id)}>
          <Ionicons
            name={"ios-close"}
            size={35}
            style={{ marginBottom: -3 }}
            color="black"
          />
        </Remove>
      </View>
    );
  };
  const order = disable => {
    if (!disable) {
      _clearPalette();
      alert("받아보기");
    }
  };
  const fillWithEmpty = () => {
    const empty = palette.size - filled;
    const result = [];
    for (var i = 0; i < empty; i++) {
      if (i === empty - 1) result.push(<View key={-i} isLast={true} />);
      else result.push(<View key={-i} />);
    }
    return result;
  };
  return (
    <Modal visible={visible} transparent={true}>
      <Container>
        <Close onPress={() => _closeModal()}>
          <Ionicons
            name={"ios-close"}
            size={35}
            style={{ marginBottom: -3 }}
            color="white"
          />
        </Close>
        <PaletteContainer>
          <Palette2 isSmall={false} shadow={false} filled={filled} />
        </PaletteContainer>
        <Bottom>
          <Text>상품 채우기 (테스트용)</Text>
          <ProductBox size={palette.size}>
            {palette.selected.map((item, index) =>
              index === palette.size - 1
                ? Product(item.id, item.name, true, palette)
                : Product(item.id, item.name, false, palette)
            )}
            {fillWithEmpty()}
          </ProductBox>
          <InfoBox>
            <PayInfo onPress={() => alert("결제 정보")}>
              <InfoText>결제 정보</InfoText>
              <Ionicons
                name={"ios-arrow-forward"}
                size={20}
                style={{ marginBottom: -3 }}
                color="black"
              />
            </PayInfo>
            <DeliveryInfo onPress={() => alert("배송 정보")}>
              <InfoText>배송 정보</InfoText>
              <Ionicons
                name={"ios-arrow-forward"}
                size={20}
                style={{ marginBottom: -3 }}
                color="black"
              />
            </DeliveryInfo>
          </InfoBox>
          <Button disable={disable} onPress={() => order(disable)}>
            <OrderText disable={disable}>받아보기</OrderText>
            {disable ? <Notice>나머지 제품을 선택해 주세요</Notice> : null}
          </Button>
        </Bottom>
      </Container>
    </Modal>
  );
};
PaletteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  _closeModal: PropTypes.func.isRequired,
  _removeTester: PropTypes.func.isRequired,
  _clearPalette: PropTypes.func.isRequired,
  palette: PropTypes.object.isRequired
};

export default PaletteModal;
