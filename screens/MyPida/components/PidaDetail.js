import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Modal } from "react-native"

const PidaDetail = ({ visible, closeModal }) => {
  return (
    <Modal visible={visible} transparent={false}>
      <Container onPress={() => closeModal()} />
    </Modal>
  )
}
PidaDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}
export default PidaDetail

const Container = styled.TouchableOpacity`
  flex: 1;
  background-color: grey;
`
