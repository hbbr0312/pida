import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import Layout from "../../../constants/Layout"
import Colors from "../../../constants/Colors"
import { Entypo } from "@expo/vector-icons"
import { updatePayInfo } from "../../../api"
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const PayInfoPresenter = ({
  issuer,
  month,
  year,
  card_number_0,
  card_number_1,
  card_number_2,
  card_number_3,
  cvc,
  password_hashed,
  _updateState,
  fixed
}) => {
  const handleModify = async () => {
    if (!fixed) {
      const info = {
        issuer: issuer,
        card_number:
          card_number_0 + card_number_1 + card_number_2 + card_number_3,
        expiration_date: month + year,
        cvc: cvc,
        password_hashed: password_hashed
      }
      const updateStatus = await updatePayInfo(info)
      let notice
      if (updateStatus) notice = "정보가 성공적으로 수정되었습니다."
      else notice = "문제가 발생하였습니다."
      Alert.alert("결제 정보", notice, [{ text: "확인" }], {
        cancelable: false
      })
    }
    _updateState({ fixed: !fixed })
  }
  const handleText = (target, json, leng, text) => {
    _updateState(json)
    if (text.length === leng) target.focus()
  }
  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container>
          <Body>
            <CBox
              fixed={fixed}
              onPress={() => (fixed ? null : _updateState({ visible: true }))}
            >
              <Row>
                <Body>
                  <Property fixed={fixed}>카드사</Property>
                  <Company editable={!fixed} fixed={fixed}>
                    {issuer}
                  </Company>
                </Body>
                <Icon>
                  <Entypo
                    name={"triangle-down"}
                    size={25}
                    color={fixed ? "#656565" : "#696969"}
                  />
                </Icon>
              </Row>
            </CBox>
            <Box fixed={fixed}>
              <Property fixed={fixed}>카드 번호</Property>
              <Row>
                <Period
                  editable={!fixed}
                  fixed={fixed}
                  value={card_number_0}
                  keyboardType={"number-pad"}
                  maxLength={4}
                  returnKeyType={"done"}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.secondNumber.focus()
                  }}
                  onChangeText={text =>
                    handleText(
                      this.secondNumber,
                      { card_number_0: text },
                      4,
                      text
                    )
                  }
                  front={true}
                />
                <Text>-</Text>
                <Period
                  editable={!fixed}
                  fixed={fixed}
                  value={card_number_1}
                  keyboardType={"number-pad"}
                  maxLength={4}
                  returnKeyType={"done"}
                  blurOnSubmit={false}
                  ref={input => {
                    this.secondNumber = input
                  }}
                  onSubmitEditing={() => {
                    this.thirdNumber.focus()
                  }}
                  onChangeText={text =>
                    handleText(
                      this.thirdNumber,
                      { card_number_1: text },
                      4,
                      text
                    )
                  }
                />
                <Text>-</Text>
                <Period
                  editable={!fixed}
                  fixed={fixed}
                  value={card_number_2}
                  keyboardType={"number-pad"}
                  maxLength={4}
                  returnKeyType={"done"}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  ref={input => {
                    this.thirdNumber = input
                  }}
                  onSubmitEditing={() => {
                    this.lastNumber.focus()
                  }}
                  onChangeText={text =>
                    handleText(
                      this.lastNumber,
                      { card_number_2: text },
                      4,
                      text
                    )
                  }
                />
                <Text>-</Text>
                <Period
                  editable={!fixed}
                  fixed={fixed}
                  value={card_number_3}
                  keyboardType={"number-pad"}
                  maxLength={4}
                  ref={input => {
                    this.lastNumber = input
                  }}
                  onSubmitEditing={() => {
                    this.monthInput.focus()
                  }}
                  onChangeText={text =>
                    handleText(
                      this.monthInput,
                      { card_number_3: text },
                      4,
                      text
                    )
                  }
                />
              </Row>
            </Box>
            <Row>
              <Box fixed={fixed} isSmall={true}>
                <Property fixed={fixed}>유효 기간 (월/년)</Property>
                <Row>
                  <Period
                    editable={!fixed}
                    fixed={fixed}
                    value={month}
                    keyboardType={"number-pad"}
                    maxLength={2}
                    returnKeyType={"done"}
                    blurOnSubmit={false}
                    ref={input => {
                      this.monthInput = input
                    }}
                    onSubmitEditing={() => {
                      this.yearInput.focus()
                    }}
                    onChangeText={text =>
                      handleText(this.yearInput, { month: text }, 2, text)
                    }
                  />
                  <Text>/</Text>
                  <Period
                    editable={!fixed}
                    fixed={fixed}
                    value={year}
                    keyboardType={"number-pad"}
                    maxLength={2}
                    ref={input => {
                      this.yearInput = input
                    }}
                    onSubmitEditing={() => {
                      this.cvc.focus()
                    }}
                    onChangeText={text =>
                      handleText(this.cvc, { year: text }, 2, text)
                    }
                  />
                </Row>
              </Box>
              <Box fixed={fixed} isSmall={true} margin={true}>
                <Property fixed={fixed}>CVC</Property>
                <TextInput
                  secureTextEntry={true}
                  editable={!fixed}
                  fixed={fixed}
                  value={cvc}
                  keyboardType={"number-pad"}
                  maxLength={3}
                  ref={input => {
                    this.cvc = input
                  }}
                  onSubmitEditing={() => {
                    this.pw.focus()
                  }}
                  onChangeText={text =>
                    handleText(this.pw, { cvc: text }, 3, text)
                  }
                />
              </Box>
            </Row>
            <Box fixed={fixed}>
              <Property fixed={fixed}>비밀번호</Property>
              <TextInput
                secureTextEntry={true}
                editable={!fixed}
                fixed={fixed}
                value={password_hashed}
                keyboardType={"number-pad"}
                maxLength={4}
                ref={input => {
                  this.pw = input
                }}
                onChangeText={text => _updateState({ password_hashed: text })}
              />
            </Box>
          </Body>
          <ButtonContainer>
            <Button modifiable={!fixed} onPress={async () => handleModify()}>
              <ButtonText>{fixed ? "수 정" : "완 료"}</ButtonText>
            </Button>
          </ButtonContainer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

PayInfoPresenter.propTypes = {
  issuer: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  card_number_0: PropTypes.string.isRequired,
  card_number_1: PropTypes.string.isRequired,
  card_number_2: PropTypes.string.isRequired,
  card_number_3: PropTypes.string.isRequired,
  cvc: PropTypes.string.isRequired,
  password_hashed: PropTypes.string.isRequired,
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

const CBox = styled.TouchableOpacity`
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
  height: 30px;
`
const Company = styled.Text`
  color: ${props => (props.fixed ? "#656565" : "black")};
  margin-top: 13px;
  margin-left: 20px;
  font-size: 18px;
  height: 30px;
  justify-content: center;
`

const Period = styled.TextInput`
  color: ${props => (props.fixed ? "#656565" : "black")};
  margin-top: 10px;
  margin-left: 20px;
  font-size: 18px;
  height: 30px;
  width: 50px;
`

const ButtonContainer = styled.View`
  flex: 1;
  margin-top: 30px;
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

const Text = styled.Text`
  font-size: 18px;
  color: #656565;
  margin-top: 10px;
`

const Icon = styled.View`
  height: 80px;
  flex: 1;
  align-items: flex-end;
  justify-content: center;
  margin-right: 15px;
`
