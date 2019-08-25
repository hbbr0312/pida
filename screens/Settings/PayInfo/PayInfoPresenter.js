import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import Layout from "../../../constants/Layout"
import Colors from "../../../constants/Colors"

const fakeInfo = {
  card_company: "우리카드",
  card_number: "1234567800001234",
  cvc: "111",
  expiration_date: "08/12",
  password_hashed: "1234"
}

const PayInfoPresenter = ({ payInfo, _updateState, fixed }) => {
  console.log("fixed", fixed)
  return (
    <Container>
      <Body>
        <Box fixed={fixed}>
          <Property fixed={fixed}>카드사</Property>
          <TextInput
            editable={!fixed}
            fixed={fixed}
            value={fakeInfo.card_company}
          />
        </Box>
        <Box fixed={fixed}>
          <Property fixed={fixed}>카드 번호</Property>
          <TextInput
            editable={!fixed}
            fixed={fixed}
            value={fakeInfo.card_number}
          />
        </Box>
        <Row>
          <Box fixed={fixed} isSmall={true}>
            <Property fixed={fixed}>유효 기간</Property>
            <TextInput
              editable={!fixed}
              fixed={fixed}
              value={fakeInfo.expiration_date}
            />
          </Box>
          <Box fixed={fixed} isSmall={true} margin={true}>
            <Property fixed={fixed}>CVC</Property>
            <TextInput editable={!fixed} fixed={fixed} value={fakeInfo.cvc} />
          </Box>
        </Row>

        <Box fixed={fixed}>
          <Property fixed={fixed}>비밀번호</Property>
          <TextInput
            editable={!fixed}
            fixed={fixed}
            value={fakeInfo.password_hashed}
          />
        </Box>
      </Body>
      <ButtonContainer>
        <Button
          modifiable={!fixed}
          onPress={() => _updateState({ fixed: !fixed })}
        >
          <ButtonText>{fixed ? "수 정" : "완 료"}</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  )
}

PayInfoPresenter.propTypes = {
  payInfo: PropTypes.object.isRequired,
  _updateState: PropTypes.func.isRequired,
  fixed: PropTypes.bool.isRequired
}

export default PayInfoPresenter

const bigSize = Layout.window.width - 40
const smallSize = Layout.window.width / 2 - 30

const Container = styled.View`
  border-top-color: #c9c9c9;
  border-top-width: 0.3px;
  flex: 1;
  align-items: center;
`

const Body = styled.View``

const Row = styled.View`
  flex-direction: row;
`
const Box = styled.View`
  height: 80px;
  margin-top: 20px;
  width: ${props => (props.isSmall ? smallSize : bigSize)};
  margin-left: ${props => (props.margin ? "20px" : "0px")}
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: ${props => (props.fixed ? "4px" : "0px")};
  border-bottom-right-radius: ${props => (props.fixed ? "4px" : "0px")};
  background-color: ${props => (props.fixed ? "#DFDFDF" : "#EDEDED")};
  border-bottom-width: ${props => (props.fixed ? "0px" : "3px")};
  border-bottom-color: #696969;
`
//unfixed - #EDEDED // arrow - #696969
//fixed - #DFDFDF // arrow - #656565

const Property = styled.Text`
  color: ${props => (props.fixed ? "#656565" : "#696969")};
  font-size: 14px;
  margin-top: 10px;
  margin-left: 20px;
`

const TextInput = styled.TextInput`
  color: ${props => (props.fixed ? "#656565" : "black")};
  margin-top: 10px;
  margin-left: 20px;
  font-size: 18px;
`
const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`
const Button = styled.TouchableOpacity`
  background-color: ${props => (props.modifiable ? Colors.tintColor : "grey")};
  margin-bottom: 50px;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`
const ButtonText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 17px;
`
