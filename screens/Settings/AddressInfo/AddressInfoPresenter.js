import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Layout from "../../../constants/Layout"
import Colors from "../../../constants/Colors"
import { updateDeliveryInfo } from "../../../api"
import { TouchableWithoutFeedback, Keyboard } from "react-native"

const AddressInfoPresenter = ({
  fixed,
  name,
  contact_0,
  contact_1,
  contact_2,
  postal_code,
  address_line_road,
  address_line_detail,
  _updateState
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
      await updateDeliveryInfo(info)
    }
    _updateState({ fixed: !fixed })
  }
  return (
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
                onChangeText={text => _updateState({ contact_0: text })}
                front={true}
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
                onChangeText={text => _updateState({ contact_1: text })}
              />
              <Text>-</Text>
              <Period
                editable={!fixed}
                fixed={fixed}
                value={contact_2}
                keyboardType={"number-pad"}
                maxLength={4}
                returnKeyType={"done"}
                blurOnSubmit={false}
                ref={input => {
                  this.thirdNumber = input
                }}
                onSubmitEditing={() => {
                  this.lastNumber.focus()
                }}
                onChangeText={text => _updateState({ contact_2: text })}
              />
            </Row>
          </Box>
          <TBox fixed={fixed}>
            <Property fixed={fixed}>우편번호</Property>
            <Value fixed={fixed}>{postal_code}</Value>
          </TBox>
          <TBox fixed={fixed}>
            <Property fixed={fixed}>도로명</Property>
            <Value fixed={fixed}>{address_line_road}</Value>
          </TBox>
          <Box fixed={fixed}>
            <Property fixed={fixed}>상세주소</Property>
            <TextInput
              editable={!fixed}
              fixed={fixed}
              value={address_line_detail}
              onChangeText={text => _updateState({ address_line_detail: text })}
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
  _updateState: PropTypes.func.isRequired
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
