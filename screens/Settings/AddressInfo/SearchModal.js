import React from "react"
import styled from "styled-components"
import { Modal, TouchableWithoutFeedback, Keyboard } from "react-native"
import PropTypes from "prop-types"
import { addressSearch } from "../../../api"
import Colors from "../../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import Layout from "../../../constants/Layout"

export default class extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    updateAddress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      result: [],
      keyword: ""
    }
  }

  close = () => {
    const { closeModal } = this.props
    this.setState({ result: [], keyword: "" })
    closeModal()
  }

  search = async () => {
    const { keyword } = this.state
    if (keyword.length < 2) {
      alert("검색어는 두글자 이상 입력되어야 합니다.")
    }
    const result = await addressSearch(keyword, 1)
    console.log(result)
    if (result.results.common.errorCode === "0") {
      this.setState({ result: result.results.juso })
    } else {
      alert("에러가 발생하였습니다.")
    }
  }

  select = item => {
    const { updateAddress } = this.props
    this.setState({ result: [], keyword: "" })
    updateAddress(item)
  }

  render() {
    const { keyword, result } = this.state
    const { visible, updateAddress } = this.props
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Modal visible={visible} transparent={true}>
          <Container>
            <Close onPress={() => this.close()}>
              <Ionicons name={"ios-close"} size={30} color={"white"} />
            </Close>
            <Header>
              <Search>
                <SearchInput
                  autoCapitalize={"none"}
                  onChangeText={text => {
                    text.length === 0
                      ? this.setState({ keyword: text, result: [] })
                      : this.setState({ keyword: text })
                  }}
                  value={keyword}
                />
              </Search>
              <SearchButton onPress={async () => this.search()}>
                <ButtonText>검색</ButtonText>
              </SearchButton>
            </Header>
            {result.length > 0 ? (
              <BodyWrap>
                <Body>
                  {result.map((item, index) => (
                    <Item key={index} onPress={() => this.select(item)}>
                      <Number>{item.zipNo}</Number>
                      <Road>{item.roadAddrPart1}</Road>
                      {item.bdNm.length > 0 ? (
                        <Detail>{item.bdNm}</Detail>
                      ) : null}
                    </Item>
                  ))}
                </Body>
              </BodyWrap>
            ) : (
              <NoticeContainer>
                <Ionicons name={"ios-search"} size={30} color={"grey"} />
                <Notice>검색결과가 없습니다</Notice>
              </NoticeContainer>
            )}
          </Container>
        </Modal>
      </TouchableWithoutFeedback>
    )
  }
}
//#ededed
//#e2e2e2;
const modal_back = "rgba(0,0,0,0.7)"
const search_back = "#ededed"
const body_back = "#e2e2e2"
const item_back = "#e2e2e2"

const Container = styled.View`
  background-color: ${modal_back};
  flex: 1;
`
const Close = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-top: 50px;
  width: 30px;
  height: 30px;
`

const Header = styled.View`
  height: 60px;
  flex-direction: row;
  margin-top: 20px;
`
const Search = styled.View`
  margin-left: 20px;
  margin-right: 20px;
  height: 60px;
  flex: 1;
  background-color: ${search_back};
  border-radius: 3px;
`

const SearchInput = styled.TextInput`
  margin-left: 15px;
  font-size: 16px;
  height: 60px;
  flex: 1;
`
const SearchButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 80px;
  margin-right: 20px;
  background-color: ${Colors.tintColor};
  border-radius: 3px;
`
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  letter-spacing: 3px;
`
const BodyWrap = styled.View`
  background-color: ${body_back};
  margin-top: 20px;
  align-self: center;
  height: 640px;
  width: ${Layout.window.width - 40};
`

const Body = styled.ScrollView`
  flex: 1;
  border-radius: 2px;
`

const Item = styled.TouchableOpacity`
  background-color: ${item_back};
  width: ${Layout.window.width - 40};
  height: 80px;
  border-color: #ededed;
  border-width: 0.3px;
  justify-content: center;
  border-radius: 1px;
`

const Number = styled.Text`
  color: #696969;
  margin-left: 10px;
`
const Road = styled.Text`
  margin-top: 5px;
  font-size: 15px;
  margin-left: 10px;
`
const Detail = styled.Text`
  margin-top: 5px;
  font-size: 15px;
  margin-left: 10px;
`
const NoticeContainer = styled.View`
  background-color: ${body_back};
  margin-top: 20px;
  align-self: center;
  width: ${Layout.window.width - 40};
  height: 640px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`
const Notice = styled.Text`
  color: grey;
  margin-top: 10px;
`
