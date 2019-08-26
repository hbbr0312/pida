import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Modal } from "react-native"
import Colors from "../../../constants/Colors"

const fakeInfo = [
  { issuer: "우리카드", display: "우리카드" },
  { issuer: "농협카드", display: "농협카드" },
  { issuer: "카카오뱅크", display: "카카오뱅크" },
  { issuer: "신한카드", display: "신한카드" },
  { issuer: "신협카드", display: "신협카드" },
  { issuer: "KB국민카드", display: "KB국민카드" },
  { issuer: "삼성카드", display: "삼성카드" }
]
const CompanyModal = ({ visible, _updateState }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <Container>
        <View>
          <Header>
            <Title>카드사</Title>
          </Header>
          <Body>
            {fakeInfo.map((bank, index) => (
              <Row
                key={index}
                onPress={() =>
                  _updateState({
                    issuer: bank.issuer,
                    visible: false
                  })
                }
              >
                <Text>{bank.display}</Text>
              </Row>
            ))}
          </Body>
          <Bottom>
            <Button onPress={() => _updateState({ visible: false })}>
              <ButtonText>취소</ButtonText>
            </Button>
          </Bottom>
        </View>
      </Container>
    </Modal>
  )
}

CompanyModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  _updateState: PropTypes.func
}

export default CompanyModal

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`

const View = styled.View`
  width: 350px;
  height: 300px;
  border-radius: 5px;
  background-color: white;
`
const Header = styled.View`
  height: 60px;
  justify-content: center;
`
const Title = styled.Text`
  font-size: 20px;
  margin-left: 20px;
`
const Body = styled.ScrollView`
  width: 350px;
  height: 180px;
`
const Row = styled.TouchableOpacity`
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`
const Icon = styled.View`
  margin-left: 20px;
`
const Text = styled.Text`
  font-size: 14px;
  margin-left: 20px;
`

const Bottom = styled.View`
  border-top-color: #c9c9c9;
  border-top-width: 0.3px;
  height: 60px;
  justify-content: flex-end;
  flex-direction: row;
`

const Button = styled.TouchableOpacity`
  width: 60px;
  align-items: center;
  justify-content: center;
`
const ButtonText = styled.Text`
  color: ${Colors.tintColor};
`
