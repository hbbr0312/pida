import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

const PaletteModal = ({ visible, _closeModal }) => {
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
      </Container>
    </Modal>
  );
};

PaletteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  _closeModal: PropTypes.func.isRequired
};

export default PaletteModal;
