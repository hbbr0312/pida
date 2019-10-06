import React from "react"
import { Modal } from "react-native"
import styled from "styled-components"
import PropTypes from "prop-types"
import { withNavigation } from "react-navigation"
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"
import { Palette2 } from "./Palettes"
import { cartPay, testerPay, groupPay } from "../paymodule"
import { orderTester, orderPurchase } from "../api"

class Complete extends React.Component {
  static propTypes = {
    from: PropTypes.string.isRequired,
    img: PropTypes.string, //주문 완료, 참여 완료
    visible: PropTypes.bool.isRequired,
    _closeComplete: PropTypes.func.isRequired,
    _orderComplete: PropTypes.func.isRequired,
    start: PropTypes.string.isRequired,
    length: PropTypes.number,
    select: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      module: null
    }
  }

  callback = async response => {
    const { from, _closeComplete } = this.props
    if (response.imp_success === "false") _closeComplete()
    else {
      let status
      if (from == "order") status = await orderPurchase()
      else if (from == "palette") status = await orderTester()

      if (status === 201) {
        console.log("order success")
        this.setState({ step: 2 })
      } else {
        console.log("fail :(")
        alert("오류가 생겼습니다 관리자에게 문의하세요")
      }
    }
  }

  componentWillReceiveProps = async props => {
    const { from, select } = this.props
    let module
    if (from === "order") module = await cartPay(this.callback)
    else if (from === "palette") module = await testerPay(this.callback)
    else module = await groupPay(select, this.callback)
    this.setState({ module })
  }

  go = to => {
    const { _orderComplete, navigation, from } = this.props
    this.setState({ step: 1 })
    _orderComplete()
    navigation.navigate({
      routeName: to
    })
  }

  render() {
    const { from, img, visible, start, length } = this.props
    const { step, module } = this.state
    const notice = makeNotice(from)
    if (step === 1)
      return (
        <Modal visible={visible} transparent={false}>
          <ModuleContainer>{module}</ModuleContainer>
        </Modal>
      )
    else
      return (
        <Modal visible={visible} transparent={false}>
          <Container>
            <Top>
              <ImageContainer>
                {from === "palette" ? (
                  <Palette2 isSmall={false} shadow={true} filled={2} />
                ) : (
                  <Image source={{ uri: img }} />
                )}
                {makeText(length)}
              </ImageContainer>
              <Notice>{notice}</Notice>
            </Top>
            <Bottom>
              <ToMyPida onPress={() => this.go("MyPida")}>
                <Text color="white">MY피다에서 확인하기</Text>
              </ToMyPida>
              <ToMain onPress={() => this.go(start)}>
                <Text color="grey">처음으로</Text>
              </ToMain>
            </Bottom>
          </Container>
        </Modal>
      )
  }
}

export default withNavigation(Complete)

const ModuleContainer = styled.View`
  margin-top: 50px;
  background-color: #e2e2e2;
  flex: 1;
`

const Container = styled.View`
  background-color: white;
  flex: 1;
`

const Top = styled.View`
  justify-content: center;
  align-items: center;
  flex: 3;
`
const Bottom = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin-bottom: 20px;
`
const ImageContainer = styled.View`
  align-items: flex-end;
  height: 200px;
  width: 200px;
  flex-direction: row;
`
const Image = styled.Image`
  height: 200px;
  width: 200px;
`

const Notice = styled.Text`
  margin-top: 52px;
  font-weight: 500;
  letter-spacing: 2.5px;
  font-size: 34px;
`

const ToMyPida = styled.TouchableOpacity`
  height: 50px;
  width: ${Layout.window.width - 32};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.tintColor};
`

const Text = styled.Text`
  color: ${props => props.color};
  letter-spacing: 2px;
  font-size: 14px;
`

const ToMain = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 28px;
`

const Length = styled.Text`
  font-size: 25px;
  color: grey;
`

const makeNotice = from => {
  if (from === "palette") {
    return "신청 완료!"
  } else if (from === "order") {
    return "주문 완료!"
  } else {
    //from === "groupBuying"
    return "참여 완료!"
  }
}

const makeText = leng => {
  if (leng > 1) return <Length>+ {leng - 1}</Length>
  else return null
}
