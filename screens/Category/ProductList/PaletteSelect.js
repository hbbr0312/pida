import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Modal } from "react-native"
import { Palette2, Palette3, Palette7 } from "../../../components/Palettes"
import { PaletteLayer } from "../../../components/Layer"
import Layout from "../../../constants/Layout"
import { Ionicons } from "@expo/vector-icons"

const PaletteSelect = ({ _select, visible, _selectCancel }) => {
  return (
    <Modal visible={visible} transparent={false}>
      <Container>
        <Close onPress={() => _selectCancel()}>
          <Ionicons name={"ios-arrow-back"} size={30} color={"grey"} />
        </Close>
        <Section inReady={false} onPress={() => _select(2)}>
          <PaletteContainer>
            <Palette2 isSmall={true} />
          </PaletteContainer>
          <TextContainer>
            <Title>피다 베이직</Title>
            <Grey>테스터 2개 선택</Grey>
            <RowDir>
              <Grey lineThrough={true}>₩ 5,500 </Grey>
              <Grey> ₩ 0 (배송비 별도)</Grey>
            </RowDir>
          </TextContainer>
        </Section>
        <Section inReady={true} onPress={() => alert("준비중입니다")}>
          <PaletteContainer>
            <Palette3 />
          </PaletteContainer>
          <TextContainer>
            <Title>피다 플러스</Title>
            <Grey>테스터 3개 선택</Grey>
            <Grey>가격 미정</Grey>
          </TextContainer>
          <PaletteLayer>
            <Ready>준비중</Ready>
          </PaletteLayer>
        </Section>
        <Section
          inReady={true}
          isLast={true}
          onPress={() => alert("준비중입니다")}
        >
          <PaletteContainer>
            <Palette7 />
          </PaletteContainer>
          <TextContainer>
            <Title>피다 프리미엄</Title>
            <Grey>테스터 7개 선택</Grey>
            <Grey>가격 미정</Grey>
          </TextContainer>
          <PaletteLayer>
            <Ready>준비중</Ready>
          </PaletteLayer>
        </Section>
      </Container>
    </Modal>
  )
}

PaletteSelect.propTypes = {
  _select: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  _selectCancel: PropTypes.func.isRequired
}

export default PaletteSelect

const Container = styled.View`
  margin-top: 40px;
  flex: 1;
`

const Close = styled.TouchableOpacity`
  margin-left: 20px;
  margin-bottom: 10px;
  height: 30px;
  width: 30px;
  align-items: center;
  justify-content: center;
`

const Section = styled.TouchableOpacity`
  width: ${Layout.window.width};
  flex: 1;
  ${props =>
    props.isLast
      ? null
      : "border-bottom-width:0.3px;border-bottom-color: grey;"};
  flex-direction: row;
  ${props => (props.inReady ? "position:relative" : null)};
`

const PaletteContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`
const Title = styled.Text`
  letter-spacing: 1px;
  font-size: 20px;
  font-weight: 500;
`

const Grey = styled.Text`
  margin-top: 6px;
  font-size: 15px;
  color: grey;
  text-decoration: ${props => (props.lineThrough ? "line-through" : "none")};
  text-decoration-color: grey;
`

const RowDir = styled.View`
  flex-direction: row;
`

const Ready = styled.Text`
  letter-spacing: 3px;
  font-size: 22px;
  font-weight: 500;
  color: grey;
`
