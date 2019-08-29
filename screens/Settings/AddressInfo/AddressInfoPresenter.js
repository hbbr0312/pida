import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Layout from "../../../constants/Layout"
import Colors from "../../../constants/Colors"
import { updateDeliveryInfo, addressSearch } from "../../../api"
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import SearchModal from "./SearchModal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const AddressInfoPresenter = ({
  fixed,
  name,
  contact_0,
  contact_1,
  contact_2,
  postal_code,
  address_line_road,
  address_line_detail,
  _updateState,
  searchModalVisible
}) => {
  const handleModify = async () => {
    if (!fixed) {
      const info = {
        name: name,
        contact: contact_0 + contact_1 + contact_2,
        postal_code: postal_code,
        address_line_road: address_line_road,
        address_line_detail: address_line_detail
      }
      const updateStatus = await updateDeliveryInfo(info)
      let notice
      if (updateStatus) notice = "정보가 성공적으로 수정되었습니다."
      else notice = "문제가 발생하였습니다."
      Alert.alert("배송 정보", notice, [{ text: "확인" }], {
        cancelable: false
      })
    }
    _updateState({ fixed: !fixed })
  }
  const closeModal = () => {
    _updateState({ searchModalVisible: false })
  }

  const updateAddress = item => {
    _updateState({
      address_line_road: item.roadAddr,
      postal_code: item.zipNo,
      searchModalVisible: false
    })
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
            <Box fixed={fixed}>
              <Property fixed={fixed}>수령인</Property>
              <TextInput
                editable={!fixed}
                fixed={fixed}
                value={name}
                onChangeText={text => _updateState({ name: text })}
                onSubmitEditing={() => {
                  this.firstNumber.focus()
                }}
              />
            </Box>
            <Box fixed={fixed}>
              <Property fixed={fixed}>연락처</Property>
              <Row>
                <Period
                  editable={!fixed}
                  fixed={fixed}
                  value={contact_0}
                  keyboardType={"number-pad"}
                  maxLength={3}
                  returnKeyType={"done"}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.secondNumber.focus()
                  }}
                  onChangeText={text =>
                    handleText(this.secondNumber, { contact_0: text }, 3, text)
                  }
                  front={true}
                  onSubmitEditing={() => {
                    this.secondNumber.focus()
                  }}
                  ref={input => {
                    this.firstNumber = input
                  }}
                />
                <Text>-</Text>
                <Period
                  editable={!fixed}
                  fixed={fixed}
                  value={contact_1}
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
                    handleText(this.thirdNumber, { contact_1: text }, 4, text)
                  }
                />
                <Text>-</Text>
                <Period
                  editable={!fixed}
                  fixed={fixed}
                  value={contact_2}
                  keyboardType={"number-pad"}
                  maxLength={4}
                  ref={input => {
                    this.thirdNumber = input
                  }}
                  onChangeText={text => _updateState({ contact_2: text })}
                />
              </Row>
            </Box>
            <TBox
              fixed={fixed}
              onPress={() =>
                fixed ? null : _updateState({ searchModalVisible: true })
              }
            >
              <Property fixed={fixed}>우편번호</Property>
              <Value fixed={fixed}>{postal_code}</Value>
            </TBox>
            <TBox
              fixed={fixed}
              onPress={() =>
                fixed ? null : _updateState({ searchModalVisible: true })
              }
            >
              <Property fixed={fixed}>도로명</Property>
              <Value fixed={fixed}>{address_line_road}</Value>
            </TBox>
            <Box fixed={fixed}>
              <Property fixed={fixed}>상세주소</Property>
              <TextInput
                editable={!fixed}
                fixed={fixed}
                value={address_line_detail}
                onChangeText={text =>
                  _updateState({ address_line_detail: text })
                }
              />
            </Box>
          </Body>
          <ButtonContainer>
            <Button modifiable={!fixed} onPress={async () => handleModify()}>
              <ButtonText>{fixed ? "수 정" : "완 료"}</ButtonText>
            </Button>
          </ButtonContainer>
          <SearchModal
            visible={searchModalVisible}
            closeModal={closeModal}
            updateAddress={updateAddress}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

AddressInfoPresenter.propTypes = {
  fixed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  contact_0: PropTypes.string.isRequired,
  contact_1: PropTypes.string.isRequired,
  contact_2: PropTypes.string.isRequired,
  postal_code: PropTypes.string.isRequired,
  address_line_road: PropTypes.string.isRequired,
  address_line_detail: PropTypes.string.isRequired,
  _updateState: PropTypes.func.isRequired,
  searchModalVisible: PropTypes.bool.isRequired
}

export default AddressInfoPresenter

const bigSize = Layout.window.width - 40

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
  width: ${bigSize};
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

const TBox = styled.TouchableOpacity`
  height: 80px;
  margin-top: 20px;
  width: ${bigSize};
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

const Period = styled.TextInput`
  color: ${props => (props.fixed ? "#656565" : "black")};
  margin-top: 10px;
  margin-left: 20px;
  font-size: 18px;
  height: 30px;
  width: 50px;
`

const ButtonContainer = styled.View`
  margin-top: 30px;
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

const Text = styled.Text`
  font-size: 18px;
  color: #656565;
  margin-top: 10px;
  margin-left: ${props => (props.margin ? "20px" : "0px")};
`

const Value = styled.Text`
  font-size: 18px;
  color: ${props => (props.fixed ? "#656565" : "black")};
  margin-top: 10px;
  margin-left: 20px;
`
