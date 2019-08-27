import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import Colors from "../../../constants/Colors"
import { updateUserInfo } from "../../../api"
import { Alert } from "react-native"

const MyInfoPresenter = ({
  username,
  gender,
  age,
  skin_type,
  skin_concerns,
  allergies,
  modifiable,
  _updateState
}) => {
  const handleModify = async () => {
    if (modifiable) {
      const info = { gender, age, skin_concerns, skin_type, allergies }
      const updateStatus = await updateUserInfo(info)
      let notice
      if (updateStatus) notice = "정보가 성공적으로 수정되었습니다."
      else notice = "문제가 발생하였습니다."
      Alert.alert("내 정보", notice, [{ text: "확인" }], { cancelable: false })
    }
    _updateState({ modifiable: !modifiable })
  }
  const openModal = step => {
    if (modifiable) _updateState({ step: step })
  }
  return (
    <Container>
      <Header marginTop={10}>
        <Title>회원 정보</Title>
      </Header>
      <Body>
        <Item>
          <Property>이메일</Property>
          <Value1>
            <Text>{username}</Text>
          </Value1>
        </Item>
        <Item>
          <Property>성별</Property>
          <Value onPress={() => openModal(1)}>
            <Text>{parseGender(gender)}</Text>
          </Value>
        </Item>
        <Item>
          <Property>나이</Property>
          <Value onPress={() => openModal(2)}>
            <Text>{parseAge(age)}</Text>
          </Value>
        </Item>
      </Body>
      <Header marginTop={20}>
        <Title>피부 정보</Title>
      </Header>
      <Body>
        <Item>
          <Property>피부 타입</Property>
          <Value onPress={() => openModal(3)}>
            <Text>{parseType(skin_type)}</Text>
          </Value>
        </Item>
        <Item>
          <Property>피부 고민</Property>
          <Value onPress={() => openModal(4)}>
            <Text>{parseConcerns(skin_concerns)}</Text>
          </Value>
        </Item>
        <Item>
          <Property>알러지</Property>
          <Value onPress={() => openModal(5)}>
            <Text>{parseAllergies(allergies)}</Text>
          </Value>
        </Item>
      </Body>
      <ButtonContainer>
        <Button modifiable={modifiable} onPress={async () => handleModify()}>
          <ButtonText>{modifiable ? "완 료" : "수 정"}</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  )
}

const parseGender = code => {
  switch (code) {
    case 0:
      return "여성"
    case 1:
      return "남성"
    default:
      return "여성"
  }
}

const parseAge = code => {
  switch (code) {
    case 0:
      return "19세 이하"
    case 1:
      return "20 ~ 26세"
    case 2:
      return "27 ~ 36세"
    case 3:
      return "37 ~ 50세"
    case 4:
      return "51세 이상"
    default:
      return "20 ~ 26세"
  }
}

const parseType = code => {
  switch (code) {
    case 0:
      return "건성"
    case 1:
      return "중성"
    case 2:
      return "지성"
    case 3:
      return "복합성"
    default:
      return "중성"
  }
}

const parseConcerns = array => {
  const info = {
    a: "여드름",
    b: "블랙헤드",
    c: "홍조",
    d: "탄력",
    e: "미백",
    f: "미세먼지",
    g: "SPF지수",
    h: "기타"
  }
  const length = array.length
  if (length > 0) {
    let result = ""
    for (var i = 0; i < length; i++) {
      result += info[array[i]]
      if (i < length - 1) result += ", "
    }
    return result
  } else {
    return "없음"
  }
}
const parseAllergies = array => {
  const info = {
    a: "땅콩",
    b: "알콜",
    c: "천연 추출물",
    d: "향",
    e: "기타",
    f: "없음"
  }
  const length = array.length
  if (length > 0) {
    let result = ""
    for (var i = 0; i < length; i++) {
      result += info[array[i]]
      if (i < length - 1) result += ", "
    }
    return result
  } else {
    return "없음"
  }
}

MyInfoPresenter.propsTypes = {
  username: PropTypes.string.isRequired,
  gender: PropTypes.number.isRequired,
  age: PropTypes.number.isRequired,
  skin_type: PropTypes.number.isRequired,
  skin_concerns: PropTypes.array.isRequired,
  allergies: PropTypes.array.isRequired,
  modifiable: PropTypes.bool.isRequired,
  _updateState: PropTypes.func.isRequired
}

export default MyInfoPresenter

const Container = styled.View`
  border-top-color: #c9c9c9;
  border-top-width: 0.3px;
  flex: 1;
`

const Header = styled.View`
  height: 50px;
  margin-left: 20px;
  justify-content: center;
  margin-top: ${props => props.marginTop};
`

const Title = styled.Text`
  font-weight: 500;
`

const Body = styled.View`
  margin-left: 20px;
`

const Item = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
  border-bottom-color: #c9c9c9;
  border-bottom-width: 0.3px;
`

const Property = styled.Text`
  width: 80px;
  font-weight: 400;
  font-size: 16px;
`
const Value1 = styled.View`
  flex: 1;
`
const Value = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  justify-content: center;
`

const Text = styled.Text`
  font-size: 16px;
  color: #525252;
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
